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

function* saveSecurityPass(action) {

  try {
    let params = {
      body: {
        ...action.params,
      },
    };

    const response = yield call(API.saveSecurityPass, params);
    const normalized = normalize(response.data, Schema.drivers);

    yield put({
      type: ACTION_TYPES.SAVE_SECURITY_PASS_SUCCESS,
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
    yield put({type: ACTION_TYPES.SAVE_SECURITY_PASS_FAILURE, error});
  }
}

function* saveBankAccounts(action) {

  try {
    let params = {
      body: {
        ...action.params,
      },
    };

    const response = yield call(API.saveBankAccounts, params);
    const normalized = normalize(response.data, Schema.users);

    yield put({
      type: ACTION_TYPES.SAVE_BANK_ACCOUNTS_SUCCESS,
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
    yield put({type: ACTION_TYPES.SAVE_BANK_ACCOUNTS_FAILURE, error});
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

function* fetchBankAccounts() {
  try {
    const response = yield call(API.fetchBankAccounts);
    const normalized = normalize(response.data, Schema.users);
    yield put({
      type: ACTION_TYPES.FETCH_BANK_ACCOUNTS_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_BANK_ACCOUNTS_FAILURE, error});
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

function* fetchBankAccountsMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_BANK_ACCOUNTS_REQUEST, fetchBankAccounts);
}

function* saveSecurityPassMonitor() {
  yield takeLatest(ACTION_TYPES.SAVE_SECURITY_PASS_REQUEST, saveSecurityPass);
}
function* saveBankAccountsMonitor() {
  yield takeLatest(ACTION_TYPES.SAVE_BANK_ACCOUNTS_REQUEST, saveBankAccounts);
}

export const sagas = all([
  fork(fetchProfileMonitor),
  fork(fetchBankAccountsMonitor),
  fork(saveProfileMonitor),
  fork(saveDocumentMonitor),
  fork(saveBankAccountsMonitor),
  fork(saveTruckMonitor),
  fork(saveTrailerMonitor),
  fork(saveSecurityPassMonitor),
]);
