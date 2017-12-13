import I18n from 'utils/locale';
import isNull from 'lodash/isNull';
import CodePush from 'react-native-code-push';
import {all, call, fork, put, takeLatest, take} from 'redux-saga/effects';
import {I18nManager} from 'react-native';
import {API} from 'app/common/api';
import {ACTION_TYPES} from 'app/common/actions';
import {
  INSTALLED_KEY,
  COUNTRY_KEY,
  LANGUAGE_KEY,
  PUSH_TOKEN_KEY,
  AUTH_KEY,
  DEFAULT_LANGUAGE,
  DEFAULT_COUNTRY,
} from 'utils/env';
import {API as AUTH_API} from 'guest/common/api';
import {ACTION_TYPES as AUTH_ACTION_TYPES} from 'guest/common/actions';
import {normalize} from 'normalizr';
import {getStorageItem, setStorageItem} from 'utils/functions';
import {Schema} from 'utils/schema';

function* boot() {
  // 1- Set is the app has installed(run) before
  let installedStorageKey = yield call(getStorageItem, INSTALLED_KEY);
  if (!isNull(installedStorageKey)) {
    yield put({type: ACTION_TYPES.INSTALLED, value: true});
  }

  // 2- Set language from history
  let currentLanguage = yield call(getStorageItem, LANGUAGE_KEY);

  if (isNull(currentLanguage)) {
    currentLanguage = DEFAULT_LANGUAGE;
  }

  I18n.locale = currentLanguage;

  yield put({
    type: ACTION_TYPES.SET_LANGUAGE_SUCCESS,
    language: currentLanguage,
  });

  //3- Login from history and sync push token to user if exists
  const authStorageKey = yield call(getStorageItem, AUTH_KEY);

  if (!isNull(authStorageKey)) {
    const pushTokenStorageKey = yield call(getStorageItem, PUSH_TOKEN_KEY);

    try {
      let response = yield call(AUTH_API.login, {
        push_token: pushTokenStorageKey,
      });

      const normalized = normalize(response.data, Schema.users);

      yield put({
        type: AUTH_ACTION_TYPES.LOGIN_SUCCESS,
        entities: normalized.entities,
        payload: response.data,
      });
    } catch (error) {
      yield put({type: AUTH_ACTION_TYPES.LOGIN_FAILURE, error});
    }
  }

  //4- Set User Country
  let currentCountry = yield call(getStorageItem, COUNTRY_KEY);
  if (isNull(currentCountry)) {
    currentCountry = DEFAULT_COUNTRY;
  }
  yield put({type: ACTION_TYPES.SET_COUNTRY_SUCCESS, country: currentCountry});

  // 5- boot the app
  yield put({type: ACTION_TYPES.BOOT_SUCCESS});

  // yield take({type:'REBOOT'})
}

function* setLanguage(action) {
  if (action.language === 'ar') {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
  } else {
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
  }

  yield call(setStorageItem, LANGUAGE_KEY, action.language);

  yield put({
    type: ACTION_TYPES.SET_LANGUAGE_SUCCESS,
    language: action.language,
  });

  CodePush.restartApp();
}

function* setPushToken(action) {
  try {
    const apiToken = yield call(getStorageItem, AUTH_KEY);
    const pushTokenStorageKey = yield call(getStorageItem, PUSH_TOKEN_KEY);
    const urlParams = `?api_token=${apiToken}`;

    if (!pushTokenStorageKey) {
      yield call(setStorageItem, PUSH_TOKEN_KEY, action.params.token);
      yield call(API.storePushToken, urlParams, {
        token: action.params.token,
        os: action.params.os,
      });
    }

    yield put({
      type: ACTION_TYPES.SET_PUSH_TOKEN_SUCCESS,
      token: action.params.token,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.SET_PUSH_TOKEN_FAILURE, error});
  }
}

function* makeNetworkRequest(params) {}

function* bootMonitor() {
  yield takeLatest(ACTION_TYPES.BOOT_REQUEST, boot);
}

export function* setLanguageMonitor() {
  yield takeLatest(ACTION_TYPES.SET_LANGUAGE_REQUEST, setLanguage);
}

export function* setPushTokenMonitor() {
  yield takeLatest(ACTION_TYPES.SET_PUSH_TOKEN_REQUEST, setPushToken);
}

export function* networkRequestMonitor() {
  yield takeLatest(ACTION_TYPES.MAKE_NETWORK_REQUEST, makeNetworkRequest);
}

export const sagas = all([
  fork(bootMonitor),
  fork(setLanguageMonitor),
  fork(setPushTokenMonitor),
  fork(networkRequestMonitor),
]);
