import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {API} from 'customer/common/api';
import {ACTION_TYPES} from 'customer/common/actions';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';

function* fetchLocations() {
  try {
    const response = yield call(API.fetchLocations);
    const normalized = normalize(response.data, Schema.customers);
    const {entities} = normalized;

    yield put({
      type: ACTION_TYPES.FETCH_LOCATIONS_SUCCESS,
      entities: entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_LOCATIONS_FAILURE, error});
  }
}

function* saveLocation(action) {
  try {

    let params = {
      body:{
        ...action.params
      }
    };

    const response = yield call(API.saveLocation, params);
    const normalized = normalize(response.data, Schema.customers);
    const {entities} = normalized;

    yield put({
      type: ACTION_TYPES.SAVE_LOCATION_SUCCESS,
      entities: entities,
    });
  } catch (error) {
    yield put(APP_ACTIONS.setNotification({message: error, type: 'error'}));
    yield put({type: ACTION_TYPES.SAVE_LOCATION_SUCCESS, error});
  }
}

function* fetchLocationsMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_LOCATIONS_REQUEST, fetchLocations);
}

function* saveLocationMonitor() {
  yield takeLatest(ACTION_TYPES.SAVE_LOCATION_REQUEST, saveLocation);
}

export const sagas = all([
  fork(fetchLocationsMonitor),
  fork(saveLocationMonitor),
]);
