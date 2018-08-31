import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoginComponent } from '../components/LoginComponent';
import { bindActionCreators } from 'redux';
import { login } from '../actions/authAction';

class LoginContainer extends Component {
  constructor(){
    super();
    this.state={
      email:'',
      password:'',
      currentUser: null,
      errors: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {
    const { currentUser } = this.props;
    if(currentUser) {
      const url = currentUser.role === 'admin' ? '/dashboard' : '/home';
      this.props.history.push(url);
    }
  }

  // It will call whenever any changes detected in props or state. 
  // Used to manage state on receiving new response.
  async componentDidUpdate() {
    const { currentUser, errors } = this.props;
    if(currentUser) {
      const url = currentUser.role === 'admin' ? '/dashboard' : '/home';
      this.setState({ currentUser });
      this.props.history.push(url);
    }
    console.log("errors", errors);
    if(errors && errors[0] !== this.state.errors) {
      this.setState({ errors: errors[0] });
    }
  }

  // It will handle change in inputs and set state according to inserted input value.
  handleChange(event){
    event.preventDefault();
    this.setState({[event.target.name]:event.target.value});
  }

  // This function dispatch login action with given email, password
  async handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.login({ email, password });
  }

  // It will render component which is display UI.
  render() {
    return(
      <LoginComponent {...this.state} 
      handleChange={this.handleChange} 
      handleSubmit={this.handleSubmit} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
    errors: state.auth.errors
  };
};

const mapDispatchToProps = (dispatch) => {
return bindActionCreators({
    login:login
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);