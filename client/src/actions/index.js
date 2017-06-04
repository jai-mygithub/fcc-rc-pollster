import axios from 'axios';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';

export function signInUser(token, returnAfterLogin) {
  return function (dispatch) {
    axios.get('/api/profile', {
      headers: { authorization: token }
    })
      .then(res => {
        localStorage.setItem('token', token);
        localStorage.setItem('displayName', res.data.displayName);
        localStorage.setItem('photo', res.data.photo);
        dispatch({ type: AUTH_USER });
        returnAfterLogin();
      })
      .catch(() => dispatch(authError('Login again please')));
  }
}

export function signOutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('displayName');
  localStorage.removeItem('photo');
  return { type: UNAUTH_USER }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}