/**
 * @flow
 */

export const ACTION_TYPES = {
  UPDATE_PROFILE_REQUEST: '@customer/UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCESS: '@customer/UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAILURE: '@customer/UPDATE_PROFILE_FAILURE',

  FETCH_PROFILE_REQUEST: '@customer/FETCH_PROFILE_REQUEST',
  FETCH_PROFILE_SUCCESS: '@customer/FETCH_PROFILE_SUCCESS',
  FETCH_PROFILE_FAILURE: '@customer/FETCH_PROFILE_FAILURE',

  FETCH_EMPLOYEES_REQUEST: '@customer/FETCH_EMPLOYEES_REQUEST',
  FETCH_EMPLOYEES_SUCCESS: '@customer/FETCH_EMPLOYEES_SUCCESS',
  FETCH_EMPLOYEES_FAILURE: '@customer/FETCH_EMPLOYEES_FAILURE',

  FETCH_LOCATIONS_REQUEST: '@customer/FETCH_LOCATIONS_REQUEST',
  FETCH_LOCATIONS_SUCCESS: '@customer/FETCH_LOCATIONS_SUCCESS',
  FETCH_LOCATIONS_FAILURE: '@customer/FETCH_LOCATIONS_FAILURE',

  SAVE_EMPLOYEE_REQUEST: '@customer/SAVE_EMPLOYEE_REQUEST',
  SAVE_EMPLOYEE_SUCCESS: '@customer/SAVE_EMPLOYEE_SUCCESS',
  SAVE_EMPLOYEE_FAILURE: '@customer/SAVE_EMPLOYEE_FAILURE',

  SAVE_LOCATION_REQUEST: '@customer/SAVE_LOCATION_REQUEST',
  SAVE_LOCATION_SUCCESS: '@customer/SAVE_LOCATION_SUCCESS',
  SAVE_LOCATION_FAILURE: '@customer/SAVE_LOCATION_FAILURE',

  SAVE_LOAD_REQUEST: '@customer/SAVE_LOAD_REQUEST',
  SAVE_LOAD_SUCCESS: '@customer/SAVE_LOAD_SUCCESS',
  SAVE_LOAD_FAILURE: '@customer/SAVE_LOAD_FAILURE',

  FETCH_LOAD_ADD_DATA_REQUEST: '@customer/FETCH_LOAD_ADD_DATA_REQUEST',
  FETCH_LOAD_ADD_DATA_SUCCESS: '@customer/FETCH_LOAD_ADD_DATA_SUCCESS',
  FETCH_LOAD_ADD_DATA_FAILURE: '@customer/FETCH_LOAD_ADD_DATA_FAILURE',

  FETCH_BLOCKED_DRIVERS_REQUEST: '@customer/FETCH_BLOCKED_DRIVERS_REQUEST',
  FETCH_BLOCKED_DRIVERS_SUCCESS: '@customer/FETCH_BLOCKED_DRIVERS_SUCCESS',
  FETCH_BLOCKED_DRIVERS_FAILURE: '@customer/FETCH_BLOCKED_DRIVERS_FAILURE',

  FETCH_DRIVERS_REQUEST: '@customer/FETCH_DRIVERS_REQUEST',
  FETCH_DRIVERS_SUCCESS: '@customer/FETCH_DRIVERS_SUCCESS',
  FETCH_DRIVERS_FAILURE: '@customer/FETCH_DRIVERS_FAILURE',

  FETCH_LOADS_BY_STATUS_REQUEST: '@customer/FETCH_LOADS_BY_STATUS_REQUEST',
  FETCH_LOADS_BY_STATUS_SUCCESS: '@customer/FETCH_LOADS_BY_STATUS_SUCCESS',
  FETCH_LOADS_BY_STATUS_FAILURE: '@customer/FETCH_LOADS_BY_STATUS_FAILURE',

  SET_LOAD_ADD_DATA_REQUEST: '@customer/SET_LOAD_ADD_DATA_REQUEST',
  SET_LOAD_ADD_DATA_SUCCESS: '@customer/SET_LOAD_ADD_DATA_SUCCESS',
  SET_LOAD_ADD_DATA_FAILURE: '@customer/SET_LOAD_ADD_DATA_FAILURE',

  LOCATION_RECEIVED: '@customer/LOCATION_RECEIVED',

  SUBSCRIBE_TO_TRIP_TRACK_CHANNEL: '@customer/SUBSCRIBE_TO_TRIP_TRACK_CHANNEL',

  FETCH_LOAD_DETAILS_REQUEST: '@customer/FETCH_LOAD_DETAILS_REQUEST',
  FETCH_LOAD_DETAILS_SUCCESS: '@customer/FETCH_LOAD_DETAILS_SUCCESS',
  FETCH_LOAD_DETAILS_FAILURE: '@customer/FETCH_LOAD_DETAILS_FAILURE',

  FETCH_LOAD_DRIVERS_REQUEST: '@customer/FETCH_LOAD_DRIVERS_REQUEST',
  FETCH_LOAD_DRIVERS_SUCCESS: '@customer/FETCH_LOAD_DRIVERS_SUCCESS',
  FETCH_LOAD_DRIVERS_FAILURE: '@customer/FETCH_LOAD_DRIVERS_FAILURE',

  FETCH_LOAD_BOOKABLE_DRIVERS_REQUEST: '@customer/FETCH_LOAD_BOOKABLE_DRIVERS_REQUEST',
  FETCH_LOAD_BOOKABLE_DRIVERS_SUCCESS: '@customer/FETCH_LOAD_BOOKABLE_DRIVERS_SUCCESS',
  FETCH_LOAD_BOOKABLE_DRIVERS_FAILURE: '@customer/FETCH_LOAD_BOOKABLE_DRIVERS_FAILURE',

  FETCH_TRIP_DETAILS_REQUEST: '@customer/FETCH_TRIP_DETAILS_REQUEST',
  FETCH_TRIP_DETAILS_SUCCESS: '@customer/FETCH_TRIP_DETAILS_SUCCESS',
  FETCH_TRIP_DETAILS_FAILURE: '@customer/FETCH_TRIP_DETAILS_FAILURE',
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

function fetchLocations(params) {
  return {
    type: ACTION_TYPES.FETCH_LOCATIONS_REQUEST,
    params,
  };
}

/**
 * Get all data related to add load scene
 * ex: Trailers, Packaging, Pick & Drop Locations, GatePasses
 * @param params
 * @returns {{type: string, params: *}}
 */
function fetchLoadAddData(params) {
  return {
    type: ACTION_TYPES.FETCH_LOAD_ADD_DATA_REQUEST,
    params,
  };
}

function fetchLoadsByStatus(params) {
  return {
    type: ACTION_TYPES.FETCH_LOADS_BY_STATUS_REQUEST,
    params,
  };
}

function fetchBlockedDrivers(params) {
  return {
    type: ACTION_TYPES.FETCH_BLOCKED_DRIVERS_REQUEST,
    params,
  };
}

function fetchDrivers(params) {
  return {
    type: ACTION_TYPES.FETCH_DRIVERS_REQUEST,
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

function saveLoad(payload) {
  return {
    type: ACTION_TYPES.SAVE_LOAD_REQUEST,
    payload,
  };
}

function subscribeToTripTrack(params) {
  return {
    type: ACTION_TYPES.SUBSCRIBE_TO_TRIP_TRACK_CHANNEL,
    params,
  };
}

function setAddData(field, value) {
  return {
    type: ACTION_TYPES.SET_LOAD_ADD_DATA_REQUEST,
    field: field,
    value: value,
  };
}

function fetchLoadDetails(params) {
  return {
    type: ACTION_TYPES.FETCH_LOAD_DETAILS_REQUEST,
    params,
  };
}

function fetchLoadDrivers(params) {
  return {
    type: ACTION_TYPES.FETCH_LOAD_DRIVERS_REQUEST,
    params,
  };
}

function fetchLoadBookableDrivers(params) {
  return {
    type: ACTION_TYPES.FETCH_LOAD_BOOKABLE_DRIVERS_REQUEST,
    params,
  };
}

function fetchTripDetails(params) {
  return {
    type: ACTION_TYPES.FETCH_TRIP_DETAILS_REQUEST,
    params,
  };
}

export const ACTIONS = {
  saveProfile,
  fetchProfile,
  fetchEmployees,
  fetchLocations,
  fetchDrivers,
  fetchBlockedDrivers,
  saveEmployee,
  fetchLoadAddData,
  fetchLoadsByStatus,
  fetchLoadDetails,
  fetchLoadDrivers,
  fetchLoadBookableDrivers,
  fetchTripDetails,
  saveLoad,
  subscribeToTripTrack,
  setAddData,
};
