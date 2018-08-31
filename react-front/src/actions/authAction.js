import { SIGNUP_USER, LOGIN_USER } from '../types.js';

//action to call on signup
export function signup(user) {
	return 	{
		type:SIGNUP_USER,
		payload: user
  }
}

//action to call on login
export  function login(data) {
  return{
    type:LOGIN_USER,
    payload: data
  }
}