import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {API} from 'app/common/api';
import {ACTION_TYPES} from 'app/common/actions';
import {normalize} from 'normalizr';
import {Schema} from 'utils/schema';

function* fetchSecurityPasses() {
  try {
    const response = yield call(API.fetchSecurityPasses);
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
