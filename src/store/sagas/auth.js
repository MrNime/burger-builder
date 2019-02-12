import { put, delay } from 'redux-saga/effects';
import axios from 'axios';

import {
  logoutSucceed,
  logout,
  authStart,
  authSuccess,
  authFail,
  checkAuthTimeout,
} from '../actions';

export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationTime');
  yield localStorage.removeItem('userId');
  yield put(logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(logout());
}

export function* authUserSaga(action) {
  yield put(authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  const method = action.isSignUp ? 'signupNewUser' : 'verifyPassword';
  const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/${method}?key=${
    process.env.REACT_APP_FIREBASE_KEY
  }`;
  try {
    const response = yield axios.post(url, authData);
    const expirationTime = yield Date.now() + (response.data.expiresIn * 1000);
    yield localStorage.setItem('token', response.data.idToken);
    yield localStorage.setItem('expirationTime', expirationTime);
    yield localStorage.setItem('userId', response.data.localId);
    yield put(authSuccess(response.data));
    yield put(checkAuthTimeout(response.data.expiresIn));
    const redirectPath = action.hasBurger ? '/checkout' : '/';
    yield action.history.push(redirectPath);
  } catch (error) {
    yield put(authFail(error.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const currentTime = Date.now();
  const token = yield localStorage.getItem('token');
  if (!token) {
    yield put(logout());
  } else {
    const expirationTime = yield parseInt(localStorage.getItem('expirationTime'), 10);
    if (currentTime < expirationTime) {
      const userId = yield localStorage.getItem('userId');
      yield put(authSuccess({ idToken: token, localId: userId }));
      yield put(checkAuthTimeout((expirationTime - currentTime) / 1000));
    } else {
      yield put(logout());
    }
  }
}
