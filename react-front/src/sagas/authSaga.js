import { SIGNUP_USER, SIGNUP_USER_SUCCEED, SIGNUP_USER_FAILED, 
        LOGIN_USER, LOGIN_USER_SUCCEED, LOGIN_USER_FAILED
       } from '../types.js';
import { call, put, takeLatest } from 'redux-saga/effects';
import { signupUser, loginUser } from '../apis/auth';

// signup middleware function which call api function to deal with backend api and send response to reducer based on success/faliure.
function* signup(action) {
  const response = yield call(signupUser, action);
  if(response.status === 200) {
    let headers = response.headers;
    localStorage.setItem('access-token', headers["access-token"]);
    localStorage.setItem('client', headers["client"]);
    localStorage.setItem('uid', headers["uid"]);
    yield put({type: SIGNUP_USER_SUCCEED, user: response.data });
  }
  else
    yield put({type: SIGNUP_USER_FAILED, errors: response.errors.full_messages });
}

// login middleware function which call api function to deal with backend api and send response to reducer based on success/faliure.
function* login(action) {
  const response = yield call(loginUser, action);
  if(response.status === 200) {
    let headers = response.headers;
    localStorage.setItem('access-token', headers["access-token"]);
    localStorage.setItem('client', headers["client"]);
    localStorage.setItem('uid', headers["uid"]);
    yield put({ type: LOGIN_USER_SUCCEED, user: response.data });
  }
  else
    yield put({ type: LOGIN_USER_FAILED, errors: response.errors });
}

// Take latest request as per dispatched action and functions accordingly.
export const authSaga = [
  takeLatest(SIGNUP_USER, signup),
  takeLatest(LOGIN_USER, login),
]