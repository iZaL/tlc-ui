import {all, call, fork, put, takeLatest, take} from 'redux-saga/effects';
import {API} from 'driver/common/api';
import {ACTION_TYPES} from 'driver/common/actions';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';

function* saveProfile(action) {
  const {params: {resolve, reject, ...rest}} = action;

  try {
    const response = yield call(API.saveProfile, rest);
    const normalized = normalize(response.data, Schema.drivers);
    yield put({
      type: ACTION_TYPES.UPDATE_PROFILE_SUCCESS,
      entities: normalized.entities,
    });
    yield resolve();
    yield put(APP_ACTIONS.setNotification('Profile Updated', 'success'));
  } catch (error) {
    yield put(APP_ACTIONS.setNotification(error, 'error'));
    yield put({type: ACTION_TYPES.UPDATE_PROFILE_FAILURE, error});
    yield reject(error);
  }
}

function* fetchProfile() {
  try {
    const response = yield call(API.fetchProfile);
    const normalized = normalize(response.data, Schema.drivers);
    yield put({
      type: ACTION_TYPES.FETCH_PROFILE_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_PROFILE_FAILURE, error});
  }
}

function* saveTruckMonitor() {
  yield takeLatest(ACTION_TYPES.SAVE_TRUCK_REQUEST, saveTruck);
}

function* saveTruck(action) {
  try {
    const response = yield call(API.saveTruck, action.params);
    const normalized = normalize(response.data, Schema.drivers);
    yield put({
      type: ACTION_TYPES.SAVE_TRUCK_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    // yield put(APP_ACTIONS.setNotification(error, 'error'));
    yield put({type: ACTION_TYPES.SAVE_TRUCK_FAILURE, error});
  }
}

function* saveProfileMonitor() {
  yield takeLatest(ACTION_TYPES.UPDATE_PROFILE_REQUEST, saveProfile);
}

function* fetchProfileMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_PROFILE_REQUEST, fetchProfile);
}

export const sagas = all([
  fork(fetchProfileMonitor),
  fork(saveProfileMonitor),
  fork(saveTruckMonitor),
]);
