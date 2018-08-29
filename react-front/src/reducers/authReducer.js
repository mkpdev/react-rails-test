import { SIGNUP_USER_SUCCEED, SIGNUP_USER_FAILED, 
          LOGIN_USER_SUCCEED, LOGIN_USER_FAILED, 
        } from '../types';

const initialState = {
  currentUser: null,
  errors: null
}

export default function(state=initialState, action) {
	
  switch(action.type){
		case SIGNUP_USER_SUCCEED:
		  return {
			 ...state,
			 currentUser: action.user.data,
       errors: null
		  }
		case SIGNUP_USER_FAILED:
		  return{
			 ...state,
			 errors: action.errors
		  }
    case LOGIN_USER_SUCCEED:
      return{
        ...state,
        currentUser: action.user.data,
        errors: null
      }
    case LOGIN_USER_FAILED:
      return{
        ...state,
        errors: action.errors
      }
  	default:
			return state;
	}
}