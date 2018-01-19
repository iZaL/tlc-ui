import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {API} from 'driver/common/api';
import {ACTION_TYPES} from 'driver/common/actions';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';

function* fetchJobs() {
  try {
    const response = yield call(API.fetchJobs);
    const normalized = normalize(response.data, Schema.drivers);
    yield put({
      type: ACTION_TYPES.FETCH_JOBS_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_JOBS_FAILURE, error});
  }
}

function* fetchLoadDetails(action) {
  try {
    const response = yield call(API.fetchLoadDetails, action.params);
    const normalized = normalize(response.data, Schema.loads);
    yield put({
      type: ACTION_TYPES.FETCH_LOAD_DETAILS_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_LOAD_DETAILS_FAILURE, error});
  }
}

function* fetchJobsMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_JOBS_REQUEST, fetchJobs);
}

function* fetchLoadDetailsMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_LOAD_DETAILS_REQUEST, fetchLoadDetails);
}

export const sagas = all([
  fork(fetchJobsMonitor),
  fork(fetchLoadDetailsMonitor),
]);
