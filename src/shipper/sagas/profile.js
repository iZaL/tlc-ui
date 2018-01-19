import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {API} from 'shipper/common/api';
import {ACTION_TYPES} from 'shipper/common/actions';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';

function* saveProfile(action) {
  try {
    const response = yield call(API.saveProfile, action.params);
    const normalized = normalize(response.data, Schema.shippers);
    const {entities, result} = normalized;

    const profile = {
      shippers: {
        [result]: {
          ...entities.shippers[result],
          meta: response.meta,
        },
      },
    };

    yield put({
      type: ACTION_TYPES.UPDATE_PROFILE_SUCCESS,
      entities: profile,
    });
  } catch (error) {
    yield put(APP_ACTIONS.setNotification(error, 'error'));
    yield put({type: ACTION_TYPES.UPDATE_PROFILE_FAILURE, error});
  }
}

function* fetchProfile() {
  try {
    const response = yield call(API.fetchProfile);
    const normalized = normalize(response.data, Schema.shippers);
    const {entities, result} = normalized;

    const profile = {
      shippers: {
        [result]: {
          ...entities.shippers[result],
          meta: response.meta,
        },
      },
    };

    yield put({
      type: ACTION_TYPES.FETCH_PROFILE_SUCCESS,
      entities: profile,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_PROFILE_FAILURE, error});
  }
}

function* saveProfileMonitor() {
  yield takeLatest(ACTION_TYPES.UPDATE_PROFILE_REQUEST, saveProfile);
}

function* fetchProfileMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_PROFILE_REQUEST, fetchProfile);
}

export const sagas = all([fork(fetchProfileMonitor), fork(saveProfileMonitor)]);
