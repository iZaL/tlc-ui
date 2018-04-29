import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {API} from 'customer/common/api';
import {ACTION_TYPES} from 'customer/common/actions';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';

function* fetchEmployees() {
  try {
    const response = yield call(API.fetchEmployees);
    const normalized = normalize(response.data, Schema.customers);
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

    let params = {
      body:{
        ...action.params
      }
    };

    const response = yield call(API.saveEmployee, params);
    const normalized = normalize(response.data, Schema.customers);
    const {entities} = normalized;

    yield put({
      type: ACTION_TYPES.SAVE_EMPLOYEE_SUCCESS,
      entities: entities,
    });
  } catch (error) {
    yield put(APP_ACTIONS.setNotification({message: error, type: 'error'}));
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
