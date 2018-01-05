import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {API} from 'driver/common/api';
import {ACTION_TYPES} from 'driver/common/actions';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';

function* fetchLoadRequests() {
  try {
    const response = yield call(API.fetchLoadRequests);
    const normalized = normalize(response.data, Schema.drivers);
    yield put({
      type: ACTION_TYPES.FETCH_LOAD_REQUESTS_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_LOAD_REQUESTS_FAILURE, error});
  }
}

function* fetchLoadRequestsMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_LOAD_REQUESTS_REQUEST, fetchLoadRequests);
}

export const sagas = all([
  fork(fetchLoadRequestsMonitor),
]);
