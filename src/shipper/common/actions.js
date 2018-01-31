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

  FETCH_LOCATIONS_REQUEST: '@shipper/FETCH_LOCATIONS_REQUEST',
  FETCH_LOCATIONS_SUCCESS: '@shipper/FETCH_LOCATIONS_SUCCESS',
  FETCH_LOCATIONS_FAILURE: '@shipper/FETCH_LOCATIONS_FAILURE',

  SAVE_EMPLOYEE_REQUEST: '@shipper/SAVE_EMPLOYEE_REQUEST',
  SAVE_EMPLOYEE_SUCCESS: '@shipper/SAVE_EMPLOYEE_SUCCESS',
  SAVE_EMPLOYEE_FAILURE: '@shipper/SAVE_EMPLOYEE_FAILURE',

  SAVE_LOCATION_REQUEST: '@shipper/SAVE_LOCATION_REQUEST',
  SAVE_LOCATION_SUCCESS: '@shipper/SAVE_LOCATION_SUCCESS',
  SAVE_LOCATION_FAILURE: '@shipper/SAVE_LOCATION_FAILURE',

  SAVE_LOAD_REQUEST: '@shipper/SAVE_LOAD_REQUEST',
  SAVE_LOAD_SUCCESS: '@shipper/SAVE_LOAD_SUCCESS',
  SAVE_LOAD_FAILURE: '@shipper/SAVE_LOAD_FAILURE',

  FETCH_LOAD_ADD_DATA_REQUEST: '@shipper/FETCH_LOAD_ADD_DATA_REQUEST',
  FETCH_LOAD_ADD_DATA_SUCCESS: '@shipper/FETCH_LOAD_ADD_DATA_SUCCESS',
  FETCH_LOAD_ADD_DATA_FAILURE: '@shipper/FETCH_LOAD_ADD_DATA_FAILURE',

  FETCH_LOADS_BY_STATUS_REQUEST: '@shipper/FETCH_LOADS_BY_STATUS_REQUEST',
  FETCH_LOADS_BY_STATUS_SUCCESS: '@shipper/FETCH_LOADS_BY_STATUS_SUCCESS',
  FETCH_LOADS_BY_STATUS_FAILURE: '@shipper/FETCH_LOADS_BY_STATUS_FAILURE',

  LOCATION_RECEIVED: '@shipper/LOCATION_RECEIVED',

  SUBSCRIBE_TO_TRIP_TRACK_CHANNEL: '@shipper/SUBSCRIBE_TO_TRIP_TRACK_CHANNEL',

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

function saveLoad(params) {
  return {
    type: ACTION_TYPES.SAVE_LOAD_REQUEST,
    params,
  };
}


function subscribeToTripTrack(params) {
  return {
    type: ACTION_TYPES.SUBSCRIBE_TO_TRIP_TRACK_CHANNEL,
    params,
  };
}

export const ACTIONS = {
  saveProfile,
  fetchProfile,
  fetchEmployees,
  fetchLocations,
  saveEmployee,
  fetchLoadAddData,
  fetchLoadsByStatus,
  saveLoad,
  subscribeToTripTrack,
};
