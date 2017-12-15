import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {API} from 'trucks/common/api';
import {ACTION_TYPES} from 'trucks/common/actions';
import {COUNTRY_KEY} from 'utils/env';
import {normalize} from 'normalizr';
import {getStorageItem, setStorageItem} from 'utils/functions';
import {Schema} from 'utils/schema';

function* fetchTruckMakesModels() {
  try {
    const response = yield call(API.fetchTruckMakesModels);
    const normalizedMakes = normalize(response.makes, [Schema.truck_makes]);
    const normalizedModels = normalize(response.models, [Schema.truck_models]);
    // console.log('normalizedMakes',normalizedMakes);
    // console.log('normalizedModels',normalizedModels);
    yield put({
      type:'FETCH_TRUCK_MAKES',
      entities: normalizedMakes.entities,
    });
    yield put({
      type:'FETCH_TRUCK_MODELS',
      entities: normalizedModels.entities,
    });
    yield put({
      type: ACTION_TYPES.FETCH_TRUCK_MAKES_MODELS_SUCCESS,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_TRUCK_MAKES_MODELS_FAILURE, error});
  }
}

function* fetchMyTruck() {
  try {
    const response = yield call(API.fetchMyTruck);
    const normalized = normalize(response.data, Schema.trucks);
    yield put({
      type: ACTION_TYPES.FETCH_MY_TRUCK_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_MY_TRUCK_FAILURE, error});
  }
}

function* fetchTruckMakesModelsMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_TRUCK_MAKES_MODELS_REQUEST, fetchTruckMakesModels);
}

function* fetchMyTruckMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_MY_TRUCK_REQUEST, fetchMyTruck);
}

export const sagas = all([
  fork(fetchTruckMakesModelsMonitor),
  fork(fetchMyTruckMonitor),
]);
