import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {API} from 'trucks/common/api';
import {ACTION_TYPES} from 'trucks/common/actions';
import {normalize} from 'normalizr';
import {Schema} from 'utils/schema';

function* fetchTruckMakesModels() {
  try {
    const response = yield call(API.fetchTruckMakesModels);
    const normalizedMakes = normalize(response.makes, [Schema.truck_makes]);
    yield put({
      type: ACTION_TYPES.FETCH_TRUCK_MAKES_MODELS_SUCCESS,
      entities: {
        ...normalizedMakes.entities,
      },
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_TRUCK_MAKES_MODELS_FAILURE, error});
  }
}

function* fetchTrailerMakes() {
  try {
    const response = yield call(API.fetchTrailerMakes);
    const normalized = normalize(response.data, [Schema.trailer_makes]);
    yield put({
      type: ACTION_TYPES.FETCH_TRAILER_MAKES_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_TRAILER_MAKES_FAILURE, error});
  }
}

function* fetchTrailerTypes() {
  try {
    const response = yield call(API.fetchTrailerTypes);
    const normalized = normalize(response.data, [Schema.trailer_types]);
    yield put({
      type: ACTION_TYPES.FETCH_TRAILER_TYPES_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_TRAILER_TYPES_FAILURE, error});
  }
}

function* fetchTrailers() {
  try {
    const response = yield call(API.fetchTrailers);
    const normalized = normalize(response.data, [Schema.trailers]);
    yield put({
      type: ACTION_TYPES.FETCH_TRAILERS_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_TRAILERS_FAILURE, error});
  }
}

function* fetchTruckMakesModelsMonitor() {
  yield takeLatest(
    ACTION_TYPES.FETCH_TRUCK_MAKES_MODELS_REQUEST,
    fetchTruckMakesModels,
  );
}

function* fetchTrailerMakesMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_TRAILER_MAKES_REQUEST, fetchTrailerMakes);
}

function* fetchTrailerTypesMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_TRAILER_TYPES_REQUEST, fetchTrailerTypes);
}

function* fetchTrailersMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_TRAILERS_REQUEST, fetchTrailers);
}

export const sagas = all([
  fork(fetchTruckMakesModelsMonitor),
  fork(fetchTrailerMakesMonitor),
  fork(fetchTrailerTypesMonitor),
  fork(fetchTrailersMonitor),
]);
