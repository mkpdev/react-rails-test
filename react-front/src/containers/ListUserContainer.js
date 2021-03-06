import React,{Component} from 'react';
import { connect } from 'react-redux';
import { ListUserComponent } from '../components/ListUserComponent';
import { bindActionCreators } from 'redux';
import { list, del } from '../actions/userAction';

class ListUserContainer extends Component { 
  constructor(){
    super();
    this.state = {
      allUsers: [],
      totalPages: 0,
      currentPage: 1,
      search: '',
      filterRole: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.filterUsers = this.filterUsers.bind(this);
  }

  async componentDidMount() {
    await this.props.list();
  }

  // It will call whenever any changes detected in props or state. 
  // Used to manage state on receiving new response.
  componentDidUpdate(prevProps, prevState) {
    const { allUsers, totalPages } = this.props;
    if(prevProps.allUsers !== allUsers)
      this.setState({ allUsers })
    if(prevProps.totalPages !== totalPages)
      this.setState({ totalPages });
  }

  // This function is call when admin click on delte button.
  async handleClick(id) {
    await this.props.del(id);
    window.location.href = '/dashboard';
  }

  // This function is call when admin click on pagination.
  async nextPage(pageNumber) {
    const { search, filterRole } = this.state;
    await this.props.list(pageNumber, search, filterRole);
    await this.setState({currentPage: pageNumber});
  }

  // This function is call when admin wants to filter data by search query for by role.
  async filterUsers(event, filterBy='') {
    event.preventDefault();
    if(filterBy === 'role') {
      await this.setState({ filterRole: event.target.value });
    }
    const { search, filterRole } = this.state;
    await this.props.list(1, search, filterRole);
  }

  // It will handle change in inputs and set state according to inserted input value.
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  // It will render component which is display UI.
  render() {
    return (
      <ListUserComponent {...this.state} 
      handleClick={this.handleClick}
      handleChange={this.handleChange}
      nextPage={this.nextPage}
      filterUsers={this.filterUsers} />
    )
  }
}

function mapStateToProps(state){
	return{
    allUsers: state.user.allUsers,
    totalPages: state.user.totalPages
	}
}

const mapDispatchToProps = (dispatch) => {
  console.log(dispatch);
  return bindActionCreators({
    list: list,
    del: del
  }, dispatch);
};
export default connect(mapStateToProps,mapDispatchToProps)(ListUserContainer);