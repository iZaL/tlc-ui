/**
 * @flow
 */

export const ACTION_TYPES = {
  SAVE_PROFILE_REQUEST: '@driver/SAVE_PROFILE_REQUEST',
  SAVE_PROFILE_SUCCESS: '@driver/SAVE_PROFILE_SUCCESS',
  SAVE_PROFILE_FAILURE: '@driver/SAVE_PROFILE_FAILURE',

  SAVE_DOCUMENT_REQUEST: '@driver/SAVE_DOCUMENT_REQUEST',
  SAVE_DOCUMENT_SUCCESS: '@driver/SAVE_DOCUMENT_SUCCESS',
  SAVE_DOCUMENT_FAILURE: '@driver/SAVE_DOCUMENT_FAILURE',

  FETCH_PROFILE_REQUEST: '@driver/FETCH_PROFILE_REQUEST',
  FETCH_PROFILE_SUCCESS: '@driver/FETCH_PROFILE_SUCCESS',
  FETCH_PROFILE_FAILURE: '@driver/FETCH_PROFILE_FAILURE',

  FETCH_ROUTES_REQUEST: '@driver/FETCH_ROUTES_REQUEST',
  FETCH_ROUTES_SUCCESS: '@driver/FETCH_ROUTES_SUCCESS',
  FETCH_ROUTES_FAILURE: '@driver/FETCH_ROUTES_FAILURE',

  FETCH_UPCOMING_TRIPS_REQUEST: '@driver/FETCH_UPCOMING_TRIPS_REQUEST',
  FETCH_UPCOMING_TRIPS_SUCCESS: '@driver/FETCH_UPCOMING_TRIPS_SUCCESS',
  FETCH_UPCOMING_TRIPS_FAILURE: '@driver/FETCH_UPCOMING_TRIPS_FAILURE',

  FETCH_CURRENT_LOAD_REQUEST: '@driver/FETCH_CURRENT_LOAD_REQUEST',
  FETCH_CURRENT_LOAD_SUCCESS: '@driver/FETCH_CURRENT_LOAD_SUCCESS',
  FETCH_CURRENT_LOAD_FAILURE: '@driver/FETCH_CURRENT_LOAD_FAILURE',

  FETCH_LOAD_DETAILS_REQUEST: '@driver/FETCH_LOAD_DETAILS_REQUEST',
  FETCH_LOAD_DETAILS_SUCCESS: '@driver/FETCH_LOAD_DETAILS_SUCCESS',
  FETCH_LOAD_DETAILS_FAILURE: '@driver/FETCH_LOAD_DETAILS_FAILURE',

  FETCH_ROUTE_TRANSITS_REQUEST: '@driver/FETCH_ROUTE_TRANSITS_REQUEST',
  FETCH_ROUTE_TRANSITS_SUCCESS: '@driver/FETCH_ROUTE_TRANSITS_SUCCESS',
  FETCH_ROUTE_TRANSITS_FAILURE: '@driver/FETCH_ROUTE_TRANSITS_FAILURE',

  SAVE_ROUTE_REQUEST: '@driver/SAVE_ROUTE_REQUEST',
  SAVE_ROUTE_SUCCESS: '@driver/SAVE_ROUTE_SUCCESS',
  SAVE_ROUTE_FAILURE: '@driver/SAVE_ROUTE_FAILURE',

  SAVE_TRUCK_REQUEST: '@driver/SAVE_TRUCK_REQUEST',
  SAVE_TRUCK_SUCCESS: '@driver/SAVE_TRUCK_SUCCESS',
  SAVE_TRUCK_FAILURE: '@driver/SAVE_TRUCK_FAILURE',

  SAVE_TRAILER_REQUEST: '@driver/SAVE_TRAILER_REQUEST',
  SAVE_TRAILER_SUCCESS: '@driver/SAVE_TRAILER_SUCCESS',
  SAVE_TRAILER_FAILURE: '@driver/SAVE_TRAILER_FAILURE',

  SYNC_ROUTE_REQUEST: '@driver/SYNC_ROUTE_REQUEST',
  SYNC_ROUTE_SUCCESS: '@driver/SYNC_ROUTE_SUCCESS',
  SYNC_ROUTE_FAILURE: '@driver/SYNC_ROUTE_FAILURE',

  FETCH_LOADS_BY_STATUS_REQUEST: '@driver/FETCH_LOADS_BY_STATUS_REQUEST',
  FETCH_LOADS_BY_STATUS_SUCCESS: '@driver/FETCH_LOADS_BY_STATUS_SUCCESS',
  FETCH_LOADS_BY_STATUS_FAILURE: '@driver/FETCH_LOADS_BY_STATUS_FAILURE',

  FETCH_SECURITY_PASSES_REQUEST: '@driver/FETCH_SECURITY_PASSES_REQUEST',
  FETCH_SECURITY_PASSES_SUCCESS: '@driver/FETCH_SECURITY_PASSES_SUCCESS',
  FETCH_SECURITY_PASSES_FAILURE: '@driver/FETCH_SECURITY_PASSES_FAILURE',

  FETCH_DOCUMENT_TYPES_REQUEST: '@driver/FETCH_DOCUMENT_TYPES_REQUEST',
  FETCH_DOCUMENT_TYPES_SUCCESS: '@driver/FETCH_DOCUMENT_TYPES_SUCCESS',
  FETCH_DOCUMENT_TYPES_FAILURE: '@driver/FETCH_DOCUMENT_TYPES_FAILURE',

  FETCH_TRIP_DETAILS_REQUEST: '@driver/FETCH_TRIP_DETAILS_REQUEST',
  FETCH_TRIP_DETAILS_SUCCESS: '@driver/FETCH_TRIP_DETAILS_SUCCESS',
  FETCH_TRIP_DETAILS_FAILURE: '@driver/FETCH_TRIP_DETAILS_FAILURE',

  FETCH_LOAD_REQUESTS_REQUEST: '@driver/FETCH_LOAD_REQUESTS_REQUEST',
  FETCH_LOAD_REQUESTS_SUCCESS: '@driver/FETCH_LOAD_REQUESTS_SUCCESS',
  FETCH_LOAD_REQUESTS_FAILURE: '@driver/FETCH_LOAD_REQUESTS_FAILURE',

  SET_TRIP_STATUS_REQUEST: '@driver/SET_TRIP_STATUS_REQUEST',
  SET_TRIP_STATUS_FAILURE: '@driver/SET_TRIP_STATUS_FAILURE',
  SET_TRIP_STATUS_SUCCESS: '@driver/SET_TRIP_STATUS_SUCCESS',
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

function fetchUpcomingTrips(params) {
  return {
    type: ACTION_TYPES.FETCH_UPCOMING_TRIPS_REQUEST,
    params,
  };
}

function fetchLoadRequests(params) {
  return {
    type: ACTION_TYPES.FETCH_LOAD_REQUESTS_REQUEST,
    params,
  };
}

function fetchCurrentLoad(params) {
  return {
    type: ACTION_TYPES.FETCH_CURRENT_LOAD_REQUEST,
    params,
  };
}

function fetchSecurityPasses(params) {
  return {
    type: ACTION_TYPES.FETCH_SECURITY_PASSES_REQUEST,
    params,
  };
}

function fetchDocumentTypes(params) {
  return {
    type: ACTION_TYPES.FETCH_DOCUMENT_TYPES_REQUEST,
    params,
  };
}

function fetchLoadDetails(params) {
  return {
    type: ACTION_TYPES.FETCH_LOAD_DETAILS_REQUEST,
    params,
  };
}

function fetchTripDetails(params) {
  return {
    type: ACTION_TYPES.FETCH_TRIP_DETAILS_REQUEST,
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
    type: ACTION_TYPES.SAVE_PROFILE_REQUEST,
    params,
  };
}

function saveDocument(params) {
  return {
    type: ACTION_TYPES.SAVE_DOCUMENT_REQUEST,
    params,
  };
}

function saveTruck(params) {
  return {
    type: ACTION_TYPES.SAVE_TRUCK_REQUEST,
    params,
  };
}

function saveTrailer(params) {
  return {
    type: ACTION_TYPES.SAVE_TRAILER_REQUEST,
    params,
  };
}

function saveRoute(params) {
  return {
    type: ACTION_TYPES.SAVE_ROUTE_REQUEST,
    params,
  };
}

function setTripStatus(params) {
  return {
    type: ACTION_TYPES.SET_TRIP_STATUS_REQUEST,
    params,
  };
}

function fetchLoadsByStatus(params) {
  return {
    type: ACTION_TYPES.FETCH_LOADS_BY_STATUS_REQUEST,
    params,
  };
}

export const ACTIONS = {
  saveProfile,
  saveDocument,
  fetchProfile,
  fetchRoutes,
  saveTruck,
  saveTrailer,
  saveRoute,
  fetchRouteTransits,
  fetchUpcomingTrips,
  fetchCurrentLoad,
  fetchLoadDetails,
  fetchLoadsByStatus,
  fetchTripDetails,
  fetchSecurityPasses,
  fetchDocumentTypes,
  // acceptTrip,
  // cancelTrip,
  // confirmTrip,
  // stopTrip,
  // starTrip,
  setTripStatus,
};
