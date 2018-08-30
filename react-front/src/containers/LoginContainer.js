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

  handleChange(event){
    event.preventDefault();
    this.setState({[event.target.name]:event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.login({ email, password });
  }

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