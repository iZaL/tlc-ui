import Qs from 'qs';
import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {ACTION_TYPES} from './actions';
import {API} from 'orders/common/api';
import Schema from 'orders/common/schema';
import {normalize} from 'normalizr';

function* fetchProperties() {
  try {
    const response = yield call(API.fetchCategories);

    const normalized = normalize(response.data, [Schema.categories]);
    yield put({
      type: ACTION_TYPES.CATEGORY_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.CATEGORY_FAILURE, error});
  }
}

// Monitoring Sagas
function* fetchCategoriesMonitor() {
  yield takeLatest(ACTION_TYPES.CATEGORY_REQUEST, fetchProperties);
}

export const sagas = all([fork(fetchCategoriesMonitor)]);
