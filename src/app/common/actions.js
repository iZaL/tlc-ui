export const ACTION_TYPES = {
  INSTALL_REQUEST: '@app/INSTALL_REQUEST',
  INSTALL_SUCCESS: '@app/INSTALL_SUCCESS',

  // INSTALLED: '@app/INSTALLED',

  BOOT_REQUEST: '@app/BOOT_REQUEST',
  BOOT_SUCCESS: '@app/BOOT_SUCCESS',

  DISMISS_NOTIFICATION: '@app/DISMISS_NOTIFICATION',
  SET_NOTIFICATION: '@app/SET_NOTIFICATION',

  SET_LANGUAGE_REQUEST: '@app/SET_LANGUAGE_REQUEST',
  SET_LANGUAGE_SUCCESS: '@app/SET_LANGUAGE_SUCCESS',

  SET_COUNTRY_REQUEST: '@app/SET_COUNTRY_REQUEST',
  SET_COUNTRY_SUCCESS: '@app/SET_COUNTRY_SUCCESS',

  SET_PUSH_TOKEN_REQUEST: '@app/SET_PUSH_TOKEN_REQUEST',
  SET_PUSH_TOKEN_SUCCESS: '@app/SET_PUSH_TOKEN_SUCCESS',
  SET_PUSH_TOKEN_FAILURE: '@app/SET_PUSH_TOKEN_FAILURE',

  FETCH_COUNTRIES_REQUEST: '@app/FETCH_COUNTRIES_REQUEST',
  FETCH_COUNTRIES_SUCCESS: '@app/FETCH_COUNTRIES_SUCCESS',
  FETCH_COUNTRIES_FAILURE: '@app/FETCH_COUNTRIES_FAILURE',

  FETCH_SECURITY_PASSES_REQUEST: '@app/FETCH_SECURITY_PASSES_REQUEST',
  FETCH_SECURITY_PASSES_SUCCESS: '@app/FETCH_SECURITY_PASSES_SUCCESS',
  FETCH_SECURITY_PASSES_FAILURE: '@app/FETCH_SECURITY_PASSES_FAILURE',

  MAKE_NETWORK_REQUEST: '@app/MAKE_NETWORK_REQUEST',

  UPLOAD_IMAGES_REQUEST: '@app/UPLOAD_IMAGES_REQUEST',
  UPLOAD_IMAGES_SUCCESS: '@app/UPLOAD_IMAGES_SUCCESS',
  UPLOAD_IMAGES_FAILURE: '@app/UPLOAD_IMAGES_FAILURE',

  SAVE_UPLOADS_REQUEST: '@app/SAVE_UPLOADS_REQUEST',
  SAVE_UPLOADS_SUCCESS: '@app/SAVE_UPLOADS_SUCCESS',
  SAVE_UPLOADS_FAILURE: '@app/SAVE_UPLOADS_FAILURE',
};

function boot() {
  return {
    type: ACTION_TYPES.BOOT_REQUEST,
  };
}

function fetchCountries() {
  return {
    type: ACTION_TYPES.FETCH_COUNTRIES_REQUEST,
  };
}

function setCountry(country) {
  return {
    type: ACTION_TYPES.SET_COUNTRY_REQUEST,
    country,
  };
}
function setInstalled(value) {
  return {
    type: ACTION_TYPES.INSTALL_REQUEST,
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

function setNotification(payload) {
  return {
    type: ACTION_TYPES.SET_NOTIFICATION,
    payload,
  };
}

function setPushToken(token) {
  return {
    type: ACTION_TYPES.SET_PUSH_TOKEN_REQUEST,
    params: token,
  };
}

function fetchSecurityPasses(params) {
  return {
    type: ACTION_TYPES.FETCH_SECURITY_PASSES_REQUEST,
    params,
  };
}

function uploadImages(params) {
  return {
    type: ACTION_TYPES.UPLOAD_IMAGES_REQUEST,
    params,
  };
}
function saveUploads(params) {
  return {
    type: ACTION_TYPES.SAVE_UPLOADS_REQUEST,
    params,
  };
}

export const ACTIONS = {
  boot,
  setCountry,
  dismissNotification,
  setNotification,
  setInstalled,
  setLanguage,
  setPushToken,
  fetchCountries,
  fetchSecurityPasses,
  uploadImages,
  saveUploads,
};
