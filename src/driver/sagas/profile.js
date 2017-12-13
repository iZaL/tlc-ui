import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {API} from 'driver/common/api';
import {ACTION_TYPES} from 'driver/common/actions';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';

function* saveProfile(action) {
  try {
    const response = yield call(API.saveProfile, action.params);
    const normalized = normalize(response.data, Schema.users);
    yield put({
      type: ACTION_TYPES.PROFILE_UPDATE_SUCCESS,
      entities: normalized.entities,
    });
    // yield put({type: ACTION_TYPES.PROFILE_UPDATE_SUCCESS, payload: response.data});
  } catch (error) {
    // yield put(APP_ACTIONS.setNotification(error, 'error'));
    yield put({type: ACTION_TYPES.PROFILE_UPDATE_FAILURE, error});
  }
}

function* fetchProfile() {
  try {
    const response = yield call(API.fetchProfile);
    const normalized = normalize(response.data, Schema.users);
    yield put({
      type: ACTION_TYPES.FETCH_PROFILE_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_PROFILE_FAILURE, error});
  }
}

function* saveProfileMonitor() {
  yield takeLatest(ACTION_TYPES.PROFILE_UPDATE_REQUEST, saveProfile);
}

function* fetchProfileMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_PROFILE_REQUEST, fetchProfile);
}

export const sagas = all([fork(fetchProfileMonitor), fork(saveProfileMonitor)]);
