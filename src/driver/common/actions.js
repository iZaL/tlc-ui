/**
 * @flow
 */

export const ACTION_TYPES = {
  PROFILE_UPDATE_REQUEST: '@driver/PROFILE_UPDATE_REQUEST',
  PROFILE_UPDATE_SUCCESS: '@driver/PROFILE_UPDATE_SUCCESS',
  PROFILE_UPDATE_FAILURE: '@driver/PROFILE_UPDATE_FAILURE',
};

function saveProfile(params) {
  return {
    type: ACTION_TYPES.PROFILE_UPDATE_REQUEST,
    params,
  };
}

export const ACTIONS = {
  saveProfile
};
