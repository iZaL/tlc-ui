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

  FETCH_ROUTES_REQUEST: '@shipper/FETCH_ROUTES_REQUEST',
  FETCH_ROUTES_SUCCESS: '@shipper/FETCH_ROUTES_SUCCESS',
  FETCH_ROUTES_FAILURE: '@shipper/FETCH_ROUTES_FAILURE',

  FETCH_JOBS_REQUEST: '@shipper/FETCH_JOBS_REQUEST',
  FETCH_JOBS_SUCCESS: '@shipper/FETCH_JOBS_SUCCESS',
  FETCH_JOBS_FAILURE: '@shipper/FETCH_JOBS_FAILURE',

  FETCH_LOAD_DETAILS_REQUEST: '@shipper/FETCH_LOAD_DETAILS_REQUEST',
  FETCH_LOAD_DETAILS_SUCCESS: '@shipper/FETCH_LOAD_DETAILS_SUCCESS',
  FETCH_LOAD_DETAILS_FAILURE: '@shipper/FETCH_LOAD_DETAILS_FAILURE',

  FETCH_ROUTE_TRANSITS_REQUEST: '@shipper/FETCH_ROUTE_TRANSITS_REQUEST',
  FETCH_ROUTE_TRANSITS_SUCCESS: '@shipper/FETCH_ROUTE_TRANSITS_SUCCESS',
  FETCH_ROUTE_TRANSITS_FAILURE: '@shipper/FETCH_ROUTE_TRANSITS_FAILURE',

  SAVE_ROUTE_REQUEST: '@shipper/SAVE_ROUTE_REQUEST',
  SAVE_ROUTE_SUCCESS: '@shipper/SAVE_ROUTE_SUCCESS',
  SAVE_ROUTE_FAILURE: '@shipper/SAVE_ROUTE_FAILURE',

  SAVE_TRUCK_REQUEST: '@truck/SAVE_TRUCK_REQUEST',
  SAVE_TRUCK_SUCCESS: '@truck/SAVE_TRUCK_SUCCESS',
  SAVE_TRUCK_FAILURE: '@truck/SAVE_TRUCK_FAILURE',

  SYNC_ROUTE_REQUEST: '@truck/SYNC_ROUTE_REQUEST',
  SYNC_ROUTE_SUCCESS: '@truck/SYNC_ROUTE_SUCCESS',
  SYNC_ROUTE_FAILURE: '@truck/SYNC_ROUTE_FAILURE',
};

function fetchProfile(params) {
  return {
    type: ACTION_TYPES.FETCH_PROFILE_REQUEST,
    params,
  };
}

function fetchRoutes(params) {
  return {
    type: ACTION_TYPES.FETCH_ROUTES_REQUEST,
    params,
  };
}

function fetchJobs(params) {
  return {
    type: ACTION_TYPES.FETCH_JOBS_REQUEST,
    params,
  };
}

function fetchLoadDetails(params) {
  return {
    type: ACTION_TYPES.FETCH_LOAD_DETAILS_REQUEST,
    params,
  };
}

function fetchRouteTransits(params) {
  return {
    type: ACTION_TYPES.FETCH_ROUTE_TRANSITS_REQUEST,
    params,
  };
}

function saveProfile(params) {
  return {
    type: ACTION_TYPES.UPDATE_PROFILE_REQUEST,
    params,
  };
}

function saveTruck(params) {
  return {
    type: ACTION_TYPES.SAVE_TRUCK_REQUEST,
    params,
  };
}

function saveRoute(params) {
  return {
    type: ACTION_TYPES.SAVE_ROUTE_REQUEST,
    params,
  };
}

export const ACTIONS = {
  saveProfile,
  fetchProfile,
  fetchRoutes,
  saveTruck,
  saveRoute,
  fetchRouteTransits,
  fetchJobs,
  fetchLoadDetails
};
