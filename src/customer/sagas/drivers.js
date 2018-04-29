import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {API} from 'customer/common/api';
import {ACTION_TYPES} from 'customer/common/actions';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';

function* fetchLoadDrivers(action) {
  try {
    const response = yield call(API.fetchLoadDrivers, action.params);
    const normalized = normalize(response.data, [Schema.drivers]);
    yield put({
      type: ACTION_TYPES.FETCH_LOAD_DRIVERS_SUCCESS,
      entities: normalized.entities,
      result: normalized.result,
      loadID: action.params.loadID,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_LOAD_DRIVERS_FAILURE, error});
  }
}

function* fetchLoadDriversMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_LOAD_DRIVERS_REQUEST, fetchLoadDrivers);
}

export const sagas = all([
  fork(fetchLoadDriversMonitor),
]);
