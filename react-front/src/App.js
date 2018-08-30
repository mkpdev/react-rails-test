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
    return (
      <div className="App">
      {this.props.currentUser && <button onClick={() => { localStorage.clear(); window.location.href = '/' }}>Logout</button>}
      <Router>
					<div>
						<Route path="/Signup" component={SignupContainer} />
						<Route exact path ='/' component ={LoginContainer}/>
            <PrivateRoutes path="/home" component={Home} authed={this.props.currentUser} 
              isAccessible={this.props.currentUser  && this.props.currentUser.role==='user'} rootRedirect='dashboard' />
            <PrivateRoutes path="/create" component={AddEditUserContainer} authed={this.props.currentUser} 
              isAccessible={this.props.currentUser && this.props.currentUser.role==='admin'} rootRedirect='home' />
            <PrivateRoutes path="/edit/:id" component={AddEditUserContainer} authed={this.props.currentUser} 
              isAccessible={this.props.currentUser && this.props.currentUser.role==='admin'} rootRedirect='home' />
            <PrivateRoutes exact path="/dashboard" component={ListUserContainer} authed={this.props.currentUser} 
              isAccessible={this.props.currentUser && this.props.currentUser.role==='admin'} rootRedirect='home' />
          </div>
				</Router>
      </div>
    );
  }
}
const mapStateToProps = state => ({ currentUser: state.auth.currentUser });
export default connect(mapStateToProps, null)(App);