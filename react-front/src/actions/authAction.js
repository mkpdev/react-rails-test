import { SIGNUP_USER, LOGIN_USER } from '../types.js';

export function signup(user) {
	return 	{
		type:SIGNUP_USER,
		payload: user
  }
}

export  function login(data) {
  return{
    type:LOGIN_USER,
    payload: data
  }
}