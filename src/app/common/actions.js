export const ACTION_TYPES = {
  BOOT_REQUEST: '@app/BOOT_REQUEST',
  BOOT_SUCCESS: '@app/BOOT_SUCCESS',
  INSTALLED: '@app/INSTALLED',
  CHANGE_COUNTRY: '@app/CHANGE_COUNTRY',
  COUNTRY_CHANGED: '@app/COUNTRY_CHANGED',
  DISMISS_NOTIFICATION: '@app/DISMISS_NOTIFICATION',
  SET_NOTIFICATION: '@app/SET_NOTIFICATION',
  SET_LANGUAGE_REQUEST: '@app/SET_LANGUAGE_REQUEST',
  SET_LANGUAGE_SUCCESS: '@app/SET_LANGUAGE_SUCCESS',
  SET_PUSH_TOKEN_REQUEST: '@app/SET_PUSH_TOKEN_REQUEST',
  SET_PUSH_TOKEN_SUCCESS: '@app/SET_PUSH_TOKEN_SUCCESS',
  SET_PUSH_TOKEN_FAILURE: '@app/SET_PUSH_TOKEN_FAILURE',
};

function boot() {
  return {
    type: ACTION_TYPES.BOOT_REQUEST,
  };
}

function changeCountry(country) {
  return {
    type: ACTION_TYPES.CHANGE_COUNTRY,
    country,
  };
}
function setInstalled(value) {
  return {
    type: ACTION_TYPES.INSTALLED,
    value,
  };
}
function setLanguage(value) {
  return {
    type: ACTION_TYPES.SET_LANGUAGE_REQUEST,
    language: value,
  };
}

function dismissNotification() {
  return {
    type: ACTION_TYPES.DISMISS_NOTIFICATION,
  };
}

function setNotification(message, messageType) {
  return {
    type: ACTION_TYPES.SET_NOTIFICATION,
    payload: {
      message: message,
      messageType: messageType,
    },
  };
}

function setPushToken(token) {
  return {
    type: ACTION_TYPES.SET_PUSH_TOKEN_REQUEST,
    params: token,
  };
}

function navigateToScene(scene, params) {
  return {
    type: ACTION_TYPES.NAVIGATE,
    scene,
    params,
  };
}

export const ACTIONS = {
  boot,
  changeCountry,
  dismissNotification,
  setNotification,
  setInstalled,
  setLanguage,
  setPushToken,
  navigateToScene,
};
