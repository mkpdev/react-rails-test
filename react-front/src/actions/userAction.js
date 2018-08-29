import { CREATE_USER, EDIT_USER, LIST_USER, DELETE_USER, SHOW_USER } from '../types.js';

export function create(data) { 
  return {
    type: CREATE_USER,
    payload: data
  }
}

export function edit(data) {
  return {
    type: EDIT_USER,
    payload: data
  }
}

export function list(pageNumber=1, search='', filterRole='') {
  return {
    type: LIST_USER,
    payload: { pageNumber, search, filterRole }
  }
}

export function del(id) {
  return {
    type: DELETE_USER,
    id
  }
}

export function show(id) {
  return {
    type: SHOW_USER,
    id
  }
}