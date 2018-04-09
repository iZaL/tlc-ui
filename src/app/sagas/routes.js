import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {API} from 'app/common/api';
import {ACTION_TYPES} from 'app/common/actions';
import {COUNTRY_KEY} from 'utils/env';
import {normalize} from 'normalizr';
import {getStorageItem, setStorageItem} from 'utils/functions';
import {Schema} from 'utils/schema';

function* fetchSecurityPasses(action) {
  try {
    const response = yield call(API.fetchSecurityPasses, action.params);
    const normalized = normalize(response.data, [Schema.security_passes]);
    yield put({
      type: ACTION_TYPES.FETCH_SECURITY_PASSES_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_SECURITY_PASSES_FAILURE, error});
  }
}

function* fetchSecurityPassesMonitor() {
  yield takeLatest(
    ACTION_TYPES.FETCH_SECURITY_PASSES_REQUEST,
    fetchSecurityPasses,
  );
}

export const sagas = all([fork(fetchSecurityPassesMonitor)]);
