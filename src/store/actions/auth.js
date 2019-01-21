import axios from 'axios';
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

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationTime');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = expirationTime => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, parseInt(expirationTime, 10) * 1000);
};

export const auth = (email, password, isSignUp) => (dispatch) => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  const method = isSignUp ? 'signupNewUser' : 'verifyPassword';
  const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/${method}?key=${process.env.REACT_APP_FIREBASE_KEY}`;
  return axios
    .post(
      url,
      authData,
    )
    .then((response) => {
      const expirationTime = Date.now() + (response.data.expiresIn * 1000);
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expirationTime', expirationTime);
      localStorage.setItem('userId', response.data.localId);
      dispatch(authSuccess(response.data));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch((err) => {
      dispatch(authFail(err.response.data.error));
    });
};


// this entire thing feels icky the way it's implemented now
export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem('token');
  const currentTime = Date.now();
  if (!token) {
    dispatch(logout());
  } else {
    const expirationTime = parseInt(localStorage.getItem('expirationTime'), 10);
    if (currentTime < expirationTime) {
      const userId = localStorage.getItem('userId');
      dispatch(authSuccess({ idToken: token, localId: userId }));
      dispatch(checkAuthTimeout((expirationTime - currentTime) / 1000));
    } else {
      dispatch(logout());
    }
  }
};
