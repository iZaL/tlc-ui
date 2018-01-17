import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {API} from 'shipper/common/api';
import {ACTION_TYPES} from 'shipper/common/actions';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';

function* fetchEmployees() {
  try {
    const response = yield call(API.fetchEmployees);
    const normalized = normalize(response.data, Schema.shippers);
    const {entities, result} = normalized;

    yield put({
      type: ACTION_TYPES.FETCH_EMPLOYEES_SUCCESS,
      entities: entities,
    });

  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_EMPLOYEES_FAILURE, error});
  }
}

function* fetchEmployeesMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_EMPLOYEES_REQUEST, fetchEmployees);
}

export const sagas = all([
  fork(fetchEmployeesMonitor),
]);
