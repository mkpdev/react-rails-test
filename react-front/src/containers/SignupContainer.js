import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SignupComponent } from '../components/SignupComponent';
import { bindActionCreators } from 'redux';
import { signup } from '../actions/authAction';

class SignupContainer extends Component {

  constructor(){
    super();
    this.state= {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'user',
      errors: null,
      currentUser: null,
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

    // It will handle change in inputs and set state according to inserted input value.
    handleChange(event){
      this.setState({ [event.target.name]: event.target.value });
    }

    // This function dispatch signup action with given data.
    async handleSubmit(event) {
      event.preventDefault();
      const { name, email, password, confirmPassword, role } = this.state;
      
      if (password === confirmPassword) {
        this.setState({msg: " "});
        await this.props.signup({ name, email, password, role });
      }
      else{
        this.setState({errors: "Passwords mismatched !!"});
      }
    }

  // It will call whenever any changes detected in props or state. 
  // Used to manage state on receiving new response.
  componentDidUpdate(prevProps, prevState) {
    const { currentUser, errors } = this.props;
    if(currentUser) {
      const url = currentUser.role === 'admin' ? '/dashboard' : '/home';
      this.setState({ currentUser });
      this.props.history.push(url);
    }
    if(errors && errors[0] !== this.state.errors) {
      this.setState({ errors: errors[0] });
    }
  }

  // It will render component which is display UI.
  render() {
    return(
      <SignupComponent {...this.state} 
      handleChange = {this.handleChange}
      handleSubmit={this.handleSubmit} />
    )
  }
}


const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    errors: state.auth.errors
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    signup: signup
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);