import {all, call, fork, put, takeLatest, take} from 'redux-saga/effects';
import {API} from 'driver/common/api';
import {ACTION_TYPES} from 'driver/common/actions';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import I18n from 'utils/locale';

function* saveProfile(action) {
  const {
    params: {resolve, reject, ...rest},
  } = action;

  try {
    let params = {
      body: {
        ...rest,
      },
    };

    const response = yield call(API.saveProfile, params);
    const normalized = normalize(response.data, Schema.drivers);

    yield put({
      type: ACTION_TYPES.UPDATE_PROFILE_SUCCESS,
      entities: normalized.entities,
    });

    yield put(
      APP_ACTIONS.setNotification({
        message: I18n.t('profile_saved'),
        type: 'success',
        position: 'center',
        backdropDismiss: false,
      }),
    );

    yield resolve();
  } catch (error) {
    yield put(
      APP_ACTIONS.setNotification({
        message: error,
        type: 'error',
      }),
    );
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

function* saveTruck(action) {
  try {
    let params = {
      body: {
        ...action.params,
      },
    };

    const response = yield call(API.saveTruck, params);
    const normalized = normalize(response.data, Schema.drivers);
    yield put({
      type: ACTION_TYPES.SAVE_TRUCK_SUCCESS,
      entities: normalized.entities,
    });

    yield put(
      APP_ACTIONS.setNotification({
        message: I18n.t('truck_saved'),
        type: 'success',
      }),
    );
  } catch (error) {
    yield put({type: ACTION_TYPES.SAVE_TRUCK_FAILURE, error});
  }
}

function* saveTruckMonitor() {
  yield takeLatest(ACTION_TYPES.SAVE_TRUCK_REQUEST, saveTruck);
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
