import {all, call, fork, put, takeLatest,takeEvery} from 'redux-saga/effects';
import {API} from 'customer/common/api';
import {ACTION_TYPES} from 'customer/common/actions';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import I18n from 'utils/locale';

function* saveLoad(action) {
  const {
    payload: {params, resolve},
  } = action;

  try {
    let requestParams = {
      body: {
        ...params,
      },
    };

    const response = yield call(API.saveLoad, requestParams);
    const formattedResponse = {
      ...response.customer,
      loads: {
        [response.load_status]: [response.load],
      },
    };

    console.log('formattedResponse  '+response.load_status,formattedResponse);

    const normalized = normalize(formattedResponse, Schema.customers);

    yield put({
      type: ACTION_TYPES.SAVE_LOAD_SUCCESS,
      entities: normalized.entities,
    });

    yield put(
      APP_ACTIONS.setNotification({
        message: I18n.t('load_add_success'),
        position: 'center',
      }),
    );
    yield resolve();
  } catch (error) {
    yield put(APP_ACTIONS.setNotification({message: error, type: 'error'}));
    yield put({type: ACTION_TYPES.SAVE_LOAD_FAILURE, error});
  }
}

function* fetchLoadAdd() {
  try {
    const response = yield call(API.fetchLoadAdd);

    const normalizedTrailers = normalize(response.data.trailers, [
      Schema.trailers,
    ]);

    const normalizedPackaging = normalize(response.data.packaging, [
      Schema.packaging,
    ]);

    const normalizedPasses = normalize(response.data.security_passes, [
      Schema.security_passes,
    ]);

    const normalizedCustomer = normalize(
      response.data.customer,
      Schema.customers,
    );

    yield put({
      type: ACTION_TYPES.FETCH_LOAD_ADD_DATA_SUCCESS,
      entities: {
        ...normalizedTrailers.entities,
        ...normalizedPackaging.entities,
        ...normalizedPasses.entities,
        ...normalizedCustomer.entities,
      },
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_LOAD_ADD_DATA_FAILURE, error});
  }
}

function* fetchLoadsByStatus(action: object) {
  try {
    const response = yield call(API.fetchLoadsByStatus, action.params.status);
    const formattedResponse = {
      ...response.customer,
      loads: {
        [response.load_status]: response.loads,
      },
    };

    console.log('formattedResponse  '+response.load_status,formattedResponse);

    const normalized = normalize(formattedResponse, Schema.customers);
    yield put({
      type: ACTION_TYPES.FETCH_LOADS_BY_STATUS_SUCCESS,
      entities: normalized.entities,
      result: normalized.result,
    });

  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_LOADS_BY_STATUS_FAILURE, error});
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

function* fetchCurrentLoad() {
  try {
    const response = yield call(API.fetchCurrentLoad);

    const formattedResponse = {
      ...response.customer,
      current_loads: response.loads,
    };

    const normalized = normalize(formattedResponse, Schema.customers);
    yield put({
      type: ACTION_TYPES.FETCH_CURRENT_LOAD_SUCCESS,
      entities: normalized.entities,
      result: normalized.result,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_CURRENT_LOAD_FAILURE, error});
  }
}

function* saveLoadMonitor() {
  yield takeLatest(ACTION_TYPES.SAVE_LOAD_REQUEST, saveLoad);
}

function* fetchLoadAddDataMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_LOAD_ADD_DATA_REQUEST, fetchLoadAdd);
}

function* fetchLoadsByStatusMonitor() {
  yield takeEvery(
    ACTION_TYPES.FETCH_LOADS_BY_STATUS_REQUEST,
    fetchLoadsByStatus,
  );
}

function* fetchLoadDetailsMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_LOAD_DETAILS_REQUEST, fetchLoadDetails);
}

function* fetchCurrentLoadMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_CURRENT_LOAD_REQUEST, fetchCurrentLoad);
}


export const sagas = all([
  fork(fetchLoadAddDataMonitor),
  fork(fetchLoadsByStatusMonitor),
  fork(saveLoadMonitor),
  fork(fetchLoadDetailsMonitor),
  fork(fetchCurrentLoadMonitor),
]);
