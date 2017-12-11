import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {API} from 'app/common/api';
import {ACTION_TYPES} from 'app/common/actions';
import {COUNTRY_KEY} from 'utils/env';
import {normalize} from 'normalizr';
import {getStorageItem, setStorageItem} from 'utils/functions';
import {Schema} from "utils/schema";

function* setCountry(action) {

  let currentCountry = yield getStorageItem(COUNTRY_KEY);

  if (currentCountry === action.country) return;

  yield call(setStorageItem, COUNTRY_KEY, action.country);

  yield put({type: ACTION_TYPES.SET_COUNTRY_SUCCESS, country: action.country});
}

function* fetchCountries() {
  try {
    const response = yield call(API.fetchCountries);
    const normalized = normalize(response.data, [Schema.countries]);
    yield put({
      type: ACTION_TYPES.FETCH_COUNTRIES_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_COUNTRIES_FAILURE, error});
  }
}

function* setCountryMonitor() {
  yield takeLatest(ACTION_TYPES.SET_COUNTRY_REQUEST, setCountry);
}

function* fetchCountriesMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_COUNTRIES_REQUEST, fetchCountries);
}

export const sagas = all([
  fork(setCountryMonitor),
  fork(fetchCountriesMonitor),
]);
