import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import SignupContainer from'./containers/SignupContainer';
import LoginContainer from './containers/LoginContainer';
import AddEditUserContainer from './containers/AddEditUserContainer';
import Home from './components/Home';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import ListUserContainer from './containers/ListUserContainer';
import PrivateRoutes from './PrivateRoutes';

class App extends Component {
  render() {
    console.log('Routes props', this.props.currentUser);
    return (
      <div className="App">
      {localStorage.length > 0 && <button onClick={() => { localStorage.clear(); window.location.href = '/' }}>Logout</button>}
      <Router>
					<div>
						<Route path="/Signup" component={SignupContainer} />
						<Route exact path ='/' component ={LoginContainer}/>
            <PrivateRoutes path="/home" component={Home} authed={this.props.currentUser  && this.props.currentUser.role==='user'} />
            <PrivateRoutes path="/create" component={AddEditUserContainer} authed={this.props.currentUser && this.props.currentUser.role==='admin'} />
            <PrivateRoutes path="/edit/:id" component={AddEditUserContainer} authed={this.props.currentUser && this.props.currentUser.role==='admin'} />
            <PrivateRoutes exact path="/dashboard" component={ListUserContainer} authed={this.props.currentUser && this.props.currentUser.role==='admin'} />
          </div>
				</Router>
      </div>
    );
  }
}
const mapStateToProps = state => ({ currentUser: state.auth.currentUser });
export default connect(mapStateToProps, null)(App);