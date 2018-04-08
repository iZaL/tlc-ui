export const ACTION_TYPES = {
  FETCH_TRUCK_MAKES_MODELS_REQUEST: '@truck/FETCH_TRUCK_MAKES_MODELS_REQUEST',
  FETCH_TRUCK_MAKES_MODELS_SUCCESS: '@truck/FETCH_TRUCK_MAKES_MODELS_SUCCESS',
  FETCH_TRUCK_MAKES_MODELS_FAILURE: '@truck/FETCH_TRUCK_MAKES_MODELS_FAILURE',

  FETCH_TRAILERS_REQUEST: '@truck/FETCH_TRAILERS_REQUEST',
  FETCH_TRAILERS_SUCCESS: '@truck/FETCH_TRAILERS_SUCCESS',
  FETCH_TRAILERS_FAILURE: '@truck/FETCH_TRAILERS_FAILURE',

  FETCH_TRAILER_MAKES_REQUEST: '@truck/FETCH_TRAILER_MAKES_REQUEST',
  FETCH_TRAILER_MAKES_SUCCESS: '@truck/FETCH_TRAILER_MAKES_SUCCESS',
  FETCH_TRAILER_MAKES_FAILURE: '@truck/FETCH_TRAILER_MAKES_FAILURE',

  FETCH_TRAILER_TYPES_REQUEST: '@truck/FETCH_TRAILER_TYPES_REQUEST',
  FETCH_TRAILER_TYPES_SUCCESS: '@truck/FETCH_TRAILER_TYPES_SUCCESS',
  FETCH_TRAILER_TYPES_FAILURE: '@truck/FETCH_TRAILER_TYPES_FAILURE',
};

function fetchTruckMakesModels() {
  return {
    type: ACTION_TYPES.FETCH_TRUCK_MAKES_MODELS_REQUEST,
  };
}

function fetchTrailerMakes() {
  return {
    type: ACTION_TYPES.FETCH_TRAILER_MAKES_REQUEST,
  };
}

function fetchTrailerTypes() {
  return {
    type: ACTION_TYPES.FETCH_TRAILER_TYPES_REQUEST,
  };
}


function fetchTrailers() {
  return {
    type: ACTION_TYPES.FETCH_TRAILERS_REQUEST,
  };
}

export const ACTIONS = {
  fetchTruckMakesModels,
  fetchTrailerMakes,
  fetchTrailerTypes,
  fetchTrailers,
};
