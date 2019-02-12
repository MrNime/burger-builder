import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = authData => ({
  type: actionTypes.AUTH_SUCCESS,
  token: authData.idToken,
  userId: authData.localId,
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const logout = () => ({ type: actionTypes.AUTH_INIT_LOGOUT });

export const logoutSucceed = () => ({ type: actionTypes.AUTH_LOGOUT });

export const checkAuthTimeout = expirationTime => ({
  type: actionTypes.AUTH_CHECK_TIMEOUT,
  expirationTime,
});

export const auth = (email, password, isSignUp, hasBurger, history) => ({
  type: actionTypes.AUTH_USER,
  email,
  password,
  isSignUp,
  hasBurger,
  history,
});

export const authCheckState = () => ({ type: actionTypes.AUTH_CHECK_STATE });
