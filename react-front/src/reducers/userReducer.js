import { CREATE_USER_SUCCEED, CREATE_USER_FAILED, 
          EDIT_USER_SUCCEED, EDIT_USER_FAILED,
          LIST_USER_SUCCEED, LIST_USER_FAILED,
          SHOW_USER_SUCCEED, SHOW_USER_FAILED,
          DELETE_USER_SUCCEED, DELETE_USER_FAILED,
       } from '../types';

const initialState = {
  allUsers: [],
  user: null,
  errors: null,
  totalPages: 1,
  updatedUser: null,
}

export default function(state = initialState, action) {
	switch(action.type) {
		case CREATE_USER_SUCCEED:
			return {
				...state,
				updatedUser: action.user,
        errors: null
			}
    case CREATE_USER_FAILED:
      console.log("ss", action);
      return {
        ...state,
        errors: action.errors
      }
    case EDIT_USER_SUCCEED:
      return {
        ...state,
        updatedUser: action.user,
        errors: null
      }
    case EDIT_USER_FAILED:
      return {
        ...state,
        errors: action.errors
      }
    case LIST_USER_SUCCEED:
      return {
        ...state,
        allUsers: action.user.users,
        totalPages: action.user.total_pages,
        updatedUser: null
      }
    case LIST_USER_FAILED:
      return {
        ...state,
        errors: action.errors
      }
    case SHOW_USER_SUCCEED:
      return {
        ...state,
        user: action.user,
        updatedUser: null,
        errors: null
      }
    case SHOW_USER_FAILED:
      return {
        ...state,
        errors: action.errors
      }
    case DELETE_USER_SUCCEED:
      return {
        ...state,
        user: action.user,
        errors: null
      }
    case DELETE_USER_FAILED:
      return {
        ...state,
        errors: action.errors
      }
		default:
			return state;
	}
}