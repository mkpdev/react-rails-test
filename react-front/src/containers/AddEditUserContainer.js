import React,{Component} from 'react';
import { connect } from 'react-redux';
import { AddEditUserComponent } from '../components/AddEditUserComponent';
import { bindActionCreators } from 'redux';
import { create, edit, show } from '../actions/userAction';

// This container is build to manage Add/Edit functionality of user.
class AddEditUserContainer extends Component { 
  constructor(){
    super();
    this.state={
      user: { id: null, email:'', name:'', role:'user' },
      errors: null
    };
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    if(id)
      await this.props.show(id);
  }

  // It will call whenever any changes detected in props or state. 
  // Used to manage state on receiving new response.
  componentDidUpdate(prevProps, prevState) {
    const { errors } = this.props;
    if(this.props.user) {
      const { user: { id, name, email, role } } = this.props;
      if(prevProps.user !== this.props.user)
        this.setState({ user: {...this.state.user, name, email, role, id } });
    }
    if(errors && errors[0] !== this.state.errors) {
      this.setState({ errors: errors[0] });
    }
    if(this.props.updatedUser) {
      this.props.history.push('/dashboard');
    }
  }

  // It will handle change in inputs and set state according to inserted input value.
  handleChange(event) {
    this.setState({user: {...this.state.user, [event.target.name]: event.target.value }});
  }

  // This function call action to create or update user data based on condition. 
  async handleSubmit(event) {
    event.preventDefault();
    const { user } = this.state;
    if(user.id)
      await this.props.edit(user);
    else
    await this.props.create(user);
  }

  // It will render component which is display UI.
  render() {
    return (
      <AddEditUserComponent {...this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
    )
  }

}

function mapStateToProps(state){
	return{
		user: state.user.user,
    updatedUser: state.user.updatedUser,
    errors: state.user.errors
	}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    create: create,
    edit: edit,
    show: show
  }, dispatch);
};
export default connect(mapStateToProps,mapDispatchToProps)(AddEditUserContainer);