import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {API} from 'customer/common/api';
import {ACTION_TYPES} from 'customer/common/actions';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import I18n from 'utils/locale';

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

function* fetchLoadBookableDrivers(action) {
  try {
    const response = yield call(API.fetchLoadBookableDrivers, action.params);

    const data = {
      ...response.load,
      bookable_drivers: response.drivers,
    };

    const normalized = normalize(data, Schema.loads);
    yield put({
      type: ACTION_TYPES.FETCH_LOAD_BOOKABLE_DRIVERS_SUCCESS,
      entities: normalized.entities,
      result: normalized.result,
      loadID: action.params.loadID,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_LOAD_BOOKABLE_DRIVERS_FAILURE, error});
  }
}

function* fetchDrivers() {
  try {
    const response = yield call(API.fetchDrivers);
    const normalized = normalize(response.data, [Schema.drivers]);
    const {entities, result} = normalized;

    yield put({
      type: ACTION_TYPES.FETCH_DRIVERS_SUCCESS,
      entities: entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_DRIVERS_FAILURE, error});
  }
}

function* fetchDriver(action) {
  try {
    const response = yield call(API.fetchDriver, action.params);
    const normalized = normalize(response.data, Schema.drivers);
    const {entities, result} = normalized;

    yield put({
      type: ACTION_TYPES.FETCH_DRIVER_SUCCESS,
      entities: entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_DRIVER_FAILURE, error});
  }
}

function* selectDriver(action) {
  const {
    payload: {params, resolve},
  } = action;

  try {
    let requestParams = {
      body: {
        ...params,
      },
    };
    const response = yield call(API.selectDriver, requestParams);
    const normalized = normalize(response.load, Schema.loads);
    yield put({
      type: ACTION_TYPES.SAVE_LOAD_SUCCESS,
      entities: normalized.entities,
    });

    yield put(
      APP_ACTIONS.setNotification({
        message: I18n.t('trip_confirmation_sent_to_driver'),
      }),
    );

    yield resolve(response.load);
  } catch (error) {
    yield put(APP_ACTIONS.setNotification({message: error, type: 'error'}));
    yield put({type: ACTION_TYPES.SAVE_LOAD_FAILURE, error});
  }
}

function* blockDriver(action) {
  try {
    let params = {
      body: {
        ...action.params,
      },
    };

    const response = yield call(API.blockDriver, params);
    const normalized = normalize(response.data, Schema.customers);
    yield put({
      type: ACTION_TYPES.BLOCK_DRIVER_SUCCESS,
      entities: normalized.entities,
    });

    yield put(
      APP_ACTIONS.setNotification({
        message: I18n.t('driver_blocked'),
      }),
    );

    yield resolve(response.load);
  } catch (error) {
    yield put(APP_ACTIONS.setNotification({message: error, type: 'error'}));
    yield put({type: ACTION_TYPES.BLOCK_DRIVER_FAILURE, error});
  }
}

function* fetchLoadDriversMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_LOAD_DRIVERS_REQUEST, fetchLoadDrivers);
}

function* fetchLoadBookableDriversMonitor() {
  yield takeLatest(
    ACTION_TYPES.FETCH_LOAD_BOOKABLE_DRIVERS_REQUEST,
    fetchLoadBookableDrivers,
  );
}

function* fetchDriversMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_DRIVERS_REQUEST, fetchDrivers);
}

function* fetchDriverMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_DRIVER_REQUEST, fetchDriver);
}

function* selectDriverMonitor() {
  yield takeLatest(ACTION_TYPES.SELECT_DRIVER_REQUEST, selectDriver);
}

function* blockDriverMonitor() {
  yield takeLatest(ACTION_TYPES.BLOCK_DRIVER_REQUEST, blockDriver);
}

export const sagas = all([
  fork(fetchLoadDriversMonitor),
  fork(fetchLoadBookableDriversMonitor),
  fork(fetchDriversMonitor),
  fork(fetchDriverMonitor),
  fork(selectDriverMonitor),
  fork(blockDriverMonitor),
]);
