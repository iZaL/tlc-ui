import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {API} from 'driver/common/api';
import {ACTION_TYPES} from 'driver/common/actions';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';

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

function* fetchLoadRequests(action) {
  try {
    const response = yield call(API.fetchLoadRequests, action.params);

    const formattedResponse = {
      ...response.driver,
      requested_loads: response.loads,
    };

    const normalized = normalize(formattedResponse, Schema.drivers);
    yield put({
      type: ACTION_TYPES.FETCH_LOAD_REQUESTS_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_LOAD_REQUESTS_FAILURE, error});
  }
}

function* fetchLoadsByStatus(action: object) {
  try {
    const response = yield call(API.fetchLoadsByStatus, action.params.status);
    const normalized = normalize(response.data, [Schema.loads]);
    yield put({
      type: ACTION_TYPES.FETCH_LOADS_BY_STATUS_SUCCESS,
      entities: normalized.entities,
      result: normalized.result,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_LOADS_BY_STATUS_FAILURE, error});
  }
}

function* fetchCurrentLoad() {
  try {
    const response = yield call(API.fetchCurrentLoad);

    const formattedResponse = {
      ...response.driver,
      current_load: response.load,
    };

    const normalized = normalize(formattedResponse, Schema.drivers);
    yield put({
      type: ACTION_TYPES.FETCH_CURRENT_LOAD_SUCCESS,
      entities: normalized.entities,
      result: normalized.result,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_CURRENT_LOAD_FAILURE, error});
  }
}

function* fetchLoadDetailsMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_LOAD_DETAILS_REQUEST, fetchLoadDetails);
}

function* fetchLoadsByStatusMonitor() {
  yield takeLatest(
    ACTION_TYPES.FETCH_LOADS_BY_STATUS_REQUEST,
    fetchLoadsByStatus,
  );
}

function* fetchCurrentLoadMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_CURRENT_LOAD_REQUEST, fetchCurrentLoad);
}

function* fetchLoadRequestsMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_LOAD_REQUESTS_REQUEST, fetchLoadRequests);
}

export const sagas = all([
  fork(fetchLoadDetailsMonitor),
  fork(fetchLoadsByStatusMonitor),
  fork(fetchCurrentLoadMonitor),
  fork(fetchLoadRequestsMonitor),
]);
