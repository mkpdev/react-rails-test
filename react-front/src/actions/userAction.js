import { CREATE_USER, EDIT_USER, LIST_USER, DELETE_USER, SHOW_USER } from '../types.js';

//In case of user creation this action will dispatch.
export function create(data) { 
  return {
    type: CREATE_USER,
    payload: data
  }
}

//In case of user updation this action will dispatch.
export function edit(data) {
  return {
    type: EDIT_USER,
    payload: data
  }
}

//To fetch list of users this action will dispatch.
// It take optional params search and filterRole which can pass in case of filtering.
export function list(pageNumber=1, search='', filterRole='') {
  return {
    type: LIST_USER,
    payload: { pageNumber, search, filterRole }
  }
}

// In case of delete user this action will dispatch
export function del(id) {
  return {
    type: DELETE_USER,
    id
  }
}

// To fetch single user data this action will dispatch
export function show(id) {
  return {
    type: SHOW_USER,
    id
  }
}