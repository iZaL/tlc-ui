import NavigatorService from 'components/NavigatorService';
import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {NavigationActions} from 'react-navigation';
import {API} from 'guest/common/api';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import {
  forgetStorageItem,
  getStorageItem,
  setStorageItem,
} from 'utils/functions';
import I18n from 'utils/locale';
import {AUTH_KEY, PUSH_TOKEN_KEY} from 'utils/env';
import {Schema} from 'utils/schema';
import {ACTION_TYPES} from 'guest/common/actions';
import {normalize} from 'normalizr';

function* login(action) {
  try {
    const pushTokenStorageKey = yield call(getStorageItem, PUSH_TOKEN_KEY);

    const params = {
      body: {
        ...action.credentials,
        push_token: pushTokenStorageKey,
      },
    };

    const response = yield call(API.login, params);
    const normalized = normalize(response.data, Schema.users);

    yield put({
      type: ACTION_TYPES.LOGIN_SUCCESS,
      entities: normalized.entities,
      payload: response.data,
    });

    if (response.meta) {
      yield call(setStorageItem, AUTH_KEY, response.meta.api_token || '');
    }

    yield put({
      type: ACTION_TYPES.SYNC_USER_TO_SOCKET,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.LOGIN_FAILURE, error});
    yield put(
      APP_ACTIONS.setNotification({
        message: error,
        type: 'error',
      }),
    );
  }
}

function* register(action) {
  try {
    const params = {
      body: {
        ...action.params,
      },
    };

    const response = yield call(API.register, params);
    yield put({type: ACTION_TYPES.REGISTER_SUCCESS, payload: response.data});

    yield NavigatorService.navigate('OTPScreen', {
      mobile: response.data.mobile,
      title: I18n.t('account_confirm'),
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.REGISTER_FAILURE, error});
    yield put(APP_ACTIONS.setNotification({message: error, type: 'error'}));
  }
}

function* forgotPassword(action) {
  try {
    const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/;

    if (!emailPattern.test(action.params.email)) {
      return yield put(APP_ACTIONS.setNotification('Invalid Email', 'error'));
    }

    const params = {
      body: {
        ...action.params,
      },
    };

    const response = yield call(API.forgotPassword, params);

    yield put({
      type: ACTION_TYPES.FORGOT_PASSWORD_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put(APP_ACTIONS.setNotification({message: error, type: 'error'}));
    yield put({type: ACTION_TYPES.FORGOT_PASSWORD_FAILURE, error});
  }
}

function* recoverPassword(action) {
  try {
    const params = {
      body: {
        ...action.params,
      },
    };
    const response = yield call(API.recoverPassword, params);
    yield put({
      type: ACTION_TYPES.RECOVER_PASSWORD_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put(APP_ACTIONS.setNotification({message: error, type: 'error'}));
    yield put({type: ACTION_TYPES.RECOVER_PASSWORD_FAILURE, error});
  }
}

function* updatePassword(action) {
  try {
    const params = {
      body: {
        ...action.params,
      },
    };
    const response = yield call(API.updatePassword, params);

    if (action.params.password !== action.params.password_confirmation) {
      return yield put(
        APP_ACTIONS.setNotification('Password does not match', 'error'),
      );
    }

    yield put({
      type: ACTION_TYPES.UPDATE_PASSWORD_SUCCESS,
      payload: response.data,
    });

    yield put(NavigationActions.back(null));
  } catch (error) {
    yield put(APP_ACTIONS.setNotification({message: error, type: 'error'}));
    yield put({type: ACTION_TYPES.UPDATE_PASSWORD_FAILURE, error});
  }
}

function* confirmOTP(action) {
  try {
    const params = {
      body: {
        ...action.params,
      },
    };
    const response = yield call(API.confirmOTP, params);

    yield put({type: ACTION_TYPES.CONFIRM_OTP_SUCCESS});

    yield put(
      APP_ACTIONS.setNotification(I18n.t('registration_success'), 'success'),
    );

    yield NavigatorService.reset('LoginScreen');
  } catch (error) {
    yield put(APP_ACTIONS.setNotification({message: error, type: 'error'}));
    yield put({type: ACTION_TYPES.CONFIRM_OTP_FAILURE, error});
  }
}

function* logout() {
  yield call(forgetStorageItem, AUTH_KEY);
}

// Monitoring Sagas
function* loginMonitor() {
  yield takeLatest(ACTION_TYPES.LOGIN_REQUEST, login);
}

function* logoutMonitor() {
  yield takeLatest(ACTION_TYPES.LOGOUT, logout);
}

function* registerMonitor() {
  yield takeLatest(ACTION_TYPES.REGISTER_REQUEST, register);
}

function* forgotPasswordMonitor() {
  yield takeLatest(ACTION_TYPES.FORGOT_PASSWORD_REQUEST, forgotPassword);
}

function* recoverPasswordMonitor() {
  yield takeLatest(ACTION_TYPES.RECOVER_PASSWORD_REQUEST, recoverPassword);
}

function* passwordUpdateMonitor() {
  yield takeLatest(ACTION_TYPES.UPDATE_PASSWORD_REQUEST, updatePassword);
}

function* confirmOTPMonitor() {
  yield takeLatest(ACTION_TYPES.CONFIRM_OTP_REQUEST, confirmOTP);
}

export const sagas = all([
  fork(loginMonitor),
  fork(logoutMonitor),
  fork(registerMonitor),
  fork(recoverPasswordMonitor),
  fork(forgotPasswordMonitor),
  fork(passwordUpdateMonitor),
  fork(confirmOTPMonitor),
]);
