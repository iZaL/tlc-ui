import {all, call, fork, put, takeLatest, take} from 'redux-saga/effects';
import {API} from 'driver/common/api';
import {ACTION_TYPES} from 'driver/common/actions';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import I18n from 'utils/locale';

function* saveProfile(action) {

  try {
    let params = {
      body: {
        ...action.params,
      },
    };

    const response = yield call(API.saveProfile, params);
    const normalized = normalize(response.data, Schema.users);

    yield put({
      type: ACTION_TYPES.SAVE_PROFILE_SUCCESS,
      entities: normalized.entities,
    });

    yield put(
      APP_ACTIONS.setNotification({
        message: I18n.t('profile_saved'),
      }),
    );
  } catch (error) {
    yield put(
      APP_ACTIONS.setNotification({
        message: error,
        type: 'error',
      }),
    );
    yield put({type: ACTION_TYPES.SAVE_PROFILE_FAILURE, error});
  }
}

function* saveTrailer(action) {

  try {
    let params = {
      body: {
        ...action.params,
      },
    };

    const response = yield call(API.saveTrailer, params);
    const normalized = normalize(response.data, Schema.drivers);

    yield put({
      type: ACTION_TYPES.SAVE_TRAILER_SUCCESS,
      entities: normalized.entities,
    });

    yield put(
      APP_ACTIONS.setNotification({
        message: I18n.t('saved'),
      }),
    );
  } catch (error) {
    yield put(
      APP_ACTIONS.setNotification({
        message: error,
        type: 'error',
      }),
    );
    yield put({type: ACTION_TYPES.SAVE_TRAILER_FAILURE, error});
  }
}

function* saveDocument(action) {

  try {
    let params = {
      body: {
        ...action.params,
      },
    };

    const response = yield call(API.saveDocument, params);
    const normalized = normalize(response.data, Schema.drivers);

    yield put({
      type: ACTION_TYPES.SAVE_DOCUMENT_SUCCESS,
      entities: normalized.entities,
    });

    yield put(
      APP_ACTIONS.setNotification({
        message: I18n.t('profile_saved'),
      }),
    );
  } catch (error) {
    yield put(
      APP_ACTIONS.setNotification({
        message: error,
        type: 'error',
      }),
    );
    yield put({type: ACTION_TYPES.SAVE_DOCUMENT_FAILURE, error});
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
        message: I18n.t('saved'),
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

function* saveDocumentMonitor() {
  yield takeLatest(ACTION_TYPES.SAVE_DOCUMENT_REQUEST, saveDocument);
}
function* saveProfileMonitor() {
  yield takeLatest(ACTION_TYPES.SAVE_PROFILE_REQUEST, saveProfile);
}
function* saveTrailerMonitor() {
  yield takeLatest(ACTION_TYPES.SAVE_TRAILER_REQUEST, saveTrailer);
}

function* fetchProfileMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_PROFILE_REQUEST, fetchProfile);
}

export const sagas = all([
  fork(fetchProfileMonitor),
  fork(saveProfileMonitor),
  fork(saveDocumentMonitor),
  fork(saveTruckMonitor),
  fork(saveTrailerMonitor),
]);
