import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {API} from 'shipper/common/api';
import {ACTION_TYPES} from 'shipper/common/actions';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';

function* fetchEmployees() {
  try {
    const response = yield call(API.fetchEmployees);
    const normalized = normalize(response.data, Schema.shippers);
    const {entities} = normalized;

    yield put({
      type: ACTION_TYPES.FETCH_EMPLOYEES_SUCCESS,
      entities: entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_EMPLOYEES_FAILURE, error});
  }
}

function* saveEmployee(action) {
  try {
    const response = yield call(API.saveEmployee, action.params);
    const normalized = normalize(response.data, Schema.shippers);
    const {entities} = normalized;

    yield put({
      type: ACTION_TYPES.SAVE_EMPLOYEE_SUCCESS,
      entities: entities,
    });
  } catch (error) {
    yield put(APP_ACTIONS.setNotification(error, 'error'));
    yield put({type: ACTION_TYPES.SAVE_EMPLOYEE_SUCCESS, error});
  }
}

function* fetchEmployeesMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_EMPLOYEES_REQUEST, fetchEmployees);
}

function* saveEmployeeMonitor() {
  yield takeLatest(ACTION_TYPES.SAVE_EMPLOYEE_REQUEST, saveEmployee);
}

export const sagas = all([
  fork(fetchEmployeesMonitor),
  fork(saveEmployeeMonitor),
]);
