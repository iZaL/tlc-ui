/**
 * @flow
 */

export const ACTION_TYPES = {
  UPDATE_PROFILE_REQUEST: '@driver/UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCESS: '@driver/UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAILURE: '@driver/UPDATE_PROFILE_FAILURE',

  FETCH_PROFILE_REQUEST: '@driver/FETCH_PROFILE_REQUEST',
  FETCH_PROFILE_SUCCESS: '@driver/FETCH_PROFILE_SUCCESS',
  FETCH_PROFILE_FAILURE: '@driver/FETCH_PROFILE_FAILURE',

  FETCH_ROUTES_REQUEST: '@driver/FETCH_ROUTES_REQUEST',
  FETCH_ROUTES_SUCCESS: '@driver/FETCH_ROUTES_SUCCESS',
  FETCH_ROUTES_FAILURE: '@driver/FETCH_ROUTES_FAILURE',

  FETCH_LOAD_REQUESTS_REQUEST: '@driver/FETCH_LOAD_REQUESTS_REQUEST',
  FETCH_LOAD_REQUESTS_SUCCESS: '@driver/FETCH_LOAD_REQUESTS_SUCCESS',
  FETCH_LOAD_REQUESTS_FAILURE: '@driver/FETCH_LOAD_REQUESTS_FAILURE',

  FETCH_LOAD_DETAILS_REQUEST: '@driver/FETCH_LOAD_DETAILS_REQUEST',
  FETCH_LOAD_DETAILS_SUCCESS: '@driver/FETCH_LOAD_DETAILS_SUCCESS',
  FETCH_LOAD_DETAILS_FAILURE: '@driver/FETCH_LOAD_DETAILS_FAILURE',

  FETCH_ROUTE_TRANSITS_REQUEST: '@driver/FETCH_ROUTE_TRANSITS_REQUEST',
  FETCH_ROUTE_TRANSITS_SUCCESS: '@driver/FETCH_ROUTE_TRANSITS_SUCCESS',
  FETCH_ROUTE_TRANSITS_FAILURE: '@driver/FETCH_ROUTE_TRANSITS_FAILURE',

  SAVE_ROUTE_REQUEST: '@driver/SAVE_ROUTE_REQUEST',
  SAVE_ROUTE_SUCCESS: '@driver/SAVE_ROUTE_SUCCESS',
  SAVE_ROUTE_FAILURE: '@driver/SAVE_ROUTE_FAILURE',

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

function fetchLoadRequests(params) {
  return {
    type: ACTION_TYPES.FETCH_LOAD_REQUESTS_REQUEST,
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
  fetchLoadRequests,
  fetchLoadDetails
};
