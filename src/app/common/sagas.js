import isNull from 'lodash/isNull';
import CodePush from 'react-native-code-push';
import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {I18nManager} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {API} from 'app/common/api';
import {ACTION_TYPES} from 'app/common/actions';
import {
  INSTALLED_KEY,
  COUNTRY_KEY,
  LANGUAGE_KEY,
  PUSH_TOKEN_KEY,
  AUTH_KEY,
} from 'utils/env';
import {getStorageItem, setStorageItem} from 'utils/functions';
import {API as AUTH_API} from 'guest/common/api';
import {ACTION_TYPES as AUTH_ACTION_TYPES} from 'guest/common/actions';
import {SELECTORS as AUTH_SELECTORS} from 'guest/common/selectors';
import I18n from 'utils/locale';

function* installed(action) {
  if (action.value === true) {
    yield call(setStorageItem, INSTALLED_KEY, 'installed');
  }
}

function* boot() {
  const state = yield select();

  // 1- Set is the app has installed(run) before
  let installedStorageKey = yield call(getStorageItem, INSTALLED_KEY);
  if (!isNull(installedStorageKey)) {
    yield put({type: ACTION_TYPES.INSTALLED, value: true});
  }

  // 2- Set language from history
  let currentLanguage = yield call(getStorageItem, LANGUAGE_KEY);
  if (isNull(currentLanguage)) {
    currentLanguage = state.app.language;
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
      yield put({
        type: AUTH_ACTION_TYPES.LOGIN_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      yield put({type: AUTH_ACTION_TYPES.LOGIN_FAILURE, error});
    }
  }

  //4- Set User Country
  let currentCountry = yield call(getStorageItem, COUNTRY_KEY);
  if (isNull(currentCountry)) {
    currentCountry = state.app.selectedCountry;
  }
  yield put({type: ACTION_TYPES.COUNTRY_CHANGED, country: currentCountry});

  // 5- boot the app
  yield put({type: ACTION_TYPES.BOOT_SUCCESS});
}

function* changeCountrySaga(action) {
  let state = yield select();
  let currentCountry = state.app.selectedCountry;

  if (currentCountry === action.country) return;

  yield call(setStorageItem, COUNTRY_KEY, action.country);
  yield put({type: ACTION_TYPES.COUNTRY_CHANGED, country: action.country});
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
    const state = yield select();
    const apiToken = AUTH_SELECTORS.getAuthToken(state);
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

function* bootMonitor() {
  yield takeLatest(ACTION_TYPES.BOOT_REQUEST, boot);
}

function* bootstrapMonitor() {
  yield takeLatest(ACTION_TYPES.INSTALLED, installed);
}

function* changeCountryMonitor() {
  yield takeLatest(ACTION_TYPES.CHANGE_COUNTRY, changeCountrySaga);
}

export function* setLanguageMonitor() {
  yield takeLatest(ACTION_TYPES.SET_LANGUAGE_REQUEST, setLanguage);
}

export function* setPushTokenMonitor() {
  yield takeLatest(ACTION_TYPES.SET_PUSH_TOKEN_REQUEST, setPushToken);
}

export const sagas = all([
  fork(bootMonitor),
  fork(bootstrapMonitor),
  fork(changeCountryMonitor),
  fork(setLanguageMonitor),
  fork(setPushTokenMonitor),
]);
