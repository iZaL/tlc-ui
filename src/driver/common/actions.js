/**
 * @flow
 */

export const ACTION_TYPES = {
  PROFILE_UPDATE_REQUEST: '@driver/PROFILE_UPDATE_REQUEST',
  PROFILE_UPDATE_SUCCESS: '@driver/PROFILE_UPDATE_SUCCESS',
  PROFILE_UPDATE_FAILURE: '@driver/PROFILE_UPDATE_FAILURE',

  FETCH_PROFILE_REQUEST: '@driver/FETCH_PROFILE_REQUEST',
  FETCH_PROFILE_SUCCESS: '@driver/FETCH_PROFILE_SUCCESS',
  FETCH_PROFILE_FAILURE: '@driver/FETCH_PROFILE_FAILURE',
};

function fetchProfile(params) {
  return {
    type: ACTION_TYPES.FETCH_PROFILE_REQUEST,
    params,
  };
}

function saveProfile(params) {
  return {
    type: ACTION_TYPES.PROFILE_UPDATE_REQUEST,
    params,
  };
}

export const ACTIONS = {
  saveProfile,
  fetchProfile,
};
