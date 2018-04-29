import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {API} from 'customer/common/api';
import {ACTION_TYPES} from 'customer/common/actions';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';

function* saveProfile(action) {
  try {

    let params = {
      body:{
        ...action.params
      }
    };

    const response = yield call(API.saveProfile, params);
    const normalized = normalize(response.data, Schema.customers);
    const {entities, result} = normalized;

    const profile = {
      customers: {
        [result]: {
          ...entities.customers[result],
          meta: response.meta,
        },
      },
    };

    yield put({
      type: ACTION_TYPES.UPDATE_PROFILE_SUCCESS,
      entities: profile,
    });
  } catch (error) {
    yield put(APP_ACTIONS.setNotification({message: error, type: 'error'}));
    yield put({type: ACTION_TYPES.UPDATE_PROFILE_FAILURE, error});
  }
}

function* fetchProfile() {
  try {
    const response = yield call(API.fetchProfile);
    const normalized = normalize(response.data, Schema.customers);
    const {entities, result} = normalized;

    const profile = {
      customers: {
        [result]: {
          ...entities.customers[result],
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

function* fetchBlockedDrivers() {
  try {
    const response = yield call(API.fetchBlockedDrivers);
    const normalized = normalize(response.data, Schema.customers);
    const {entities, result} = normalized;

    // const profile = {
    //   customers: {
    //     [result]: {
    //       ...entities.customers[result],
    //       meta: response.meta,
    //     },
    //   },
    // };

    yield put({
      type: ACTION_TYPES.FETCH_BLOCKED_DRIVERS_SUCCESS,
      entities: entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_BLOCKED_DRIVERS_FAILURE, error});
  }
}

function* fetchDrivers() {
  try {
    const response = yield call(API.fetchDrivers);
    const normalized = normalize(response.data, [Schema.drivers]);
    const {entities, result} = normalized;

    yield put({
      type: ACTION_TYPES.FETCH_DRIVERS_SUCCESS,
      entities: entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_DRIVERS_FAILURE, error});
  }
}

function* saveProfileMonitor() {
  yield takeLatest(ACTION_TYPES.UPDATE_PROFILE_REQUEST, saveProfile);
}

function* fetchProfileMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_PROFILE_REQUEST, fetchProfile);
}

function* fetchBlockedDriversMonitor() {
  yield takeLatest(
    ACTION_TYPES.FETCH_BLOCKED_DRIVERS_REQUEST,
    fetchBlockedDrivers,
  );
}
function* fetchDriversMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_DRIVERS_REQUEST, fetchDrivers);
}

export const sagas = all([
  fork(fetchProfileMonitor),
  fork(fetchBlockedDriversMonitor),
  fork(fetchDriversMonitor),
  fork(saveProfileMonitor),
]);
