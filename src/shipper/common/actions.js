/**
 * @flow
 */

export const ACTION_TYPES = {
  UPDATE_PROFILE_REQUEST: '@shipper/UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCESS: '@shipper/UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAILURE: '@shipper/UPDATE_PROFILE_FAILURE',

  FETCH_PROFILE_REQUEST: '@shipper/FETCH_PROFILE_REQUEST',
  FETCH_PROFILE_SUCCESS: '@shipper/FETCH_PROFILE_SUCCESS',
  FETCH_PROFILE_FAILURE: '@shipper/FETCH_PROFILE_FAILURE',

  FETCH_EMPLOYEES_REQUEST: '@shipper/FETCH_EMPLOYEES_REQUEST',
  FETCH_EMPLOYEES_SUCCESS: '@shipper/FETCH_EMPLOYEES_SUCCESS',
  FETCH_EMPLOYEES_FAILURE: '@shipper/FETCH_EMPLOYEES_FAILURE',

  SAVE_EMPLOYEE_REQUEST: '@shipper/SAVE_EMPLOYEE_REQUEST',
  SAVE_EMPLOYEE_SUCCESS: '@shipper/SAVE_EMPLOYEE_SUCCESS',
  SAVE_EMPLOYEE_FAILURE: '@shipper/SAVE_EMPLOYEE_FAILURE',
};

function fetchEmployees(params) {
  return {
    type: ACTION_TYPES.FETCH_EMPLOYEES_REQUEST,
    params,
  };
}
function fetchProfile(params) {
  return {
    type: ACTION_TYPES.FETCH_PROFILE_REQUEST,
    params,
  };
}

function saveProfile(params) {
  return {
    type: ACTION_TYPES.UPDATE_PROFILE_REQUEST,
    params,
  };
}
function saveEmployee(params) {
  return {
    type: ACTION_TYPES.SAVE_EMPLOYEE_REQUEST,
    params,
  };
}

export const ACTIONS = {
  saveProfile,
  fetchProfile,
  fetchEmployees,
  saveEmployee,
};
