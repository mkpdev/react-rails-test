import { CREATE_USER, CREATE_USER_SUCCEED, CREATE_USER_FAILED, 
          EDIT_USER, EDIT_USER_SUCCEED, EDIT_USER_FAILED,
          LIST_USER, LIST_USER_SUCCEED, LIST_USER_FAILED,
          SHOW_USER, SHOW_USER_SUCCEED, SHOW_USER_FAILED,
          DELETE_USER, DELETE_USER_SUCCEED, DELETE_USER_FAILED
       } from '../types';
import { call, put, takeLatest } from 'redux-saga/effects';
import { createUser, listUser, editUser, fetchUser, deleteUser } from '../apis/user';

// Manage response of create user api call and return it to reducers based of success/faliure.
function* create (action) {
  const response = yield call(createUser, action);
  if(response.status === 200) {
    yield put({ type: CREATE_USER_SUCCEED, user: response.data });
  }
  else {
     yield put({type: CREATE_USER_FAILED, errors: response.errors });
  }
}

// Manage response of list user api call and return it to reducers based of success/faliure.
function* list (action) { 
  const response = yield call(listUser, action);
  if(response.status === 200) {
    yield put({type: LIST_USER_SUCCEED, user: response.data});
  }
  else {
    console.log("err", response);
     yield put({type: LIST_USER_FAILED, errors: response.errors});
  }
}

// Manage response of edit user api call and return it to reducers based of success/faliure.
function* edit (action) {
  const response = yield call(editUser, action);
  if(response.status === 200) {
    yield put({type: EDIT_USER_SUCCEED, user: response.data});
  }
  else {
     yield put({type: EDIT_USER_FAILED, errors: response.errors});
  }
}

// Manage response of fetch user api call and return it to reducers based of success/faliure.
function* fetch (action) {
  const response = yield call(fetchUser, action);
  if(response.status === 200) {
    yield put({type: SHOW_USER_SUCCEED, user: response.data});
  }
  else {
     yield put({type: SHOW_USER_FAILED, errors: response.errors});
  }
}

// Manage response of delete user api call and return it to reducers based of success/faliure.
function* del (action) {
  const response = yield call(deleteUser, action);
  if(response.status === 200) {
    yield put({type: DELETE_USER_SUCCEED, user: response.data});
  }
  else {
    yield put({type: DELETE_USER_FAILED, errors: response.errors});
  }
}

// take latest request as per dispatched action and functions accordingly.
export const userSaga = [
  takeLatest(CREATE_USER, create),
  takeLatest(EDIT_USER, edit),
  takeLatest(LIST_USER, list),
  takeLatest(SHOW_USER, fetch),
  takeLatest(DELETE_USER, del),
]