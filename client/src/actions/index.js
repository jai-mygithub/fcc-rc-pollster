import axios from 'axios';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';

export function signInUser(token, returnAfterLogin) {
  return function (dispatch) {
    localStorage.setItem('token', token);
    axios.get('/api/profile', {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(res => {
        localStorage.setItem('displayName', res.data.displayName);
        localStorage.setItem('photo', res.data.photo);
        dispatch({ type: AUTH_USER });
        console.log('Dispatched and LocalStorage set');
      })
      .catch(() => dispatch(authError('Login again please')));
    returnAfterLogin();
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