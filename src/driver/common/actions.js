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

  SAVE_ROUTE_REQUEST: '@driver/SAVE_ROUTE_REQUEST',
  SAVE_ROUTE_SUCCESS: '@driver/SAVE_ROUTE_SUCCESS',
  SAVE_ROUTE_FAILURE: '@driver/SAVE_ROUTE_FAILURE',

  SAVE_TRUCK_REQUEST: '@truck/SAVE_TRUCK_REQUEST',
  SAVE_TRUCK_SUCCESS: '@truck/SAVE_TRUCK_SUCCESS',
  SAVE_TRUCK_FAILURE: '@truck/SAVE_TRUCK_FAILURE',

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

function saveProfile(params) {
  return {
    type: ACTION_TYPES.UPDATE_PROFILE_REQUEST,
    params,
  };
}

function saveTruck(params) {
  return {
    type: ACTION_TYPES.SAVE_TRUCK_REQUEST,
    params
  };
}

export const ACTIONS = {
  saveProfile,
  fetchProfile,
  fetchRoutes,
  saveTruck,
};
