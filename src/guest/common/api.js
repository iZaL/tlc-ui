import isNull from 'lodash/isNull';
import {fetchAPI} from 'utils/network';

function login(params, token) {
  if (isNull(token) && isNull(params)) return;
  const path = `auth/login`;

  let fetchAPIParams = {
    path,
    params,
    method: 'POST',
  };
  return fetchAPI(fetchAPIParams);
}

function register(params) {
  const path = `auth/register`;
  let fetchAPIParams = {
    path,
    params,
    method: 'POST',
  };
  return fetchAPI(fetchAPIParams);
}

function forgotPassword(params) {
  const path = `auth/password/forgot`;
  let fetchAPIParams = {
    path,
    params,
    method: 'POST',
  };
  return fetchAPI(fetchAPIParams);
}

function recoverPassword(params) {
  const path = `auth/password/recover`;
  let fetchAPIParams = {
    path,
    params,
    method: 'POST',
  };
  return fetchAPI(fetchAPIParams);
}

function updatePassword(params) {
  const path = `auth/password/update`;
  let fetchAPIParams = {
    path,
    params,
    method: 'POST',
  };
  return fetchAPI(fetchAPIParams);
}

function confirmOTP(params) {
  const path = `auth/otp/confirm`;
  let fetchAPIParams = {
    path,
    params,
    method: 'POST',
  };
  return fetchAPI(fetchAPIParams);
}

export const API = {
  login,
  register,
  recoverPassword,
  forgotPassword,
  updatePassword,
  confirmOTP,
};
