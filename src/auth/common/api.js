import isNull from 'lodash/isNull';
import {fetchAPI} from 'common/api';

export const AUTH_STORAGE_KEY = 'AUTH_TOKEN_KEY';

function login(params) {
  // if (isNull(token) && isNull(params)) return;
  const url = `auth/login`;
  return fetchAPI(url, 'POST', params);
}

function register(params) {
  const url = `auth/register`;
  return fetchAPI(url, 'POST', params);
}

function forgotPassword(params) {
  const url = `auth/password/forgot`;
  return fetchAPI(url, 'POST', params);
}

function recoverPassword(params) {
  const url = `auth/password/recover`;
  return fetchAPI(url, 'POST', params);
}

function updatePassword(params) {
  const url = `auth/password/update`;
  return fetchAPI(url, 'POST', params);
}

function confirmOTP(params) {
  const url = `auth/otp/confirm`;
  return fetchAPI(url, 'POST', params);
}

export const API = {
  login,
  register,
  recoverPassword,
  forgotPassword,
  updatePassword,
  confirmOTP,
};
