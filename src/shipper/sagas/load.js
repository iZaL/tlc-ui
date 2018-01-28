import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {API} from 'shipper/common/api';
import {ACTION_TYPES} from 'shipper/common/actions';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';

function* saveLoad(action) {
  try {
    const response = yield call(API.saveLoad, action.params);
    const normalized = normalize(response.data, Schema.shippers);
    const {entities, result} = normalized;

    // const profile = {
    //   shippers: {
    //     [result]: {
    //       ...entities.shippers[result],
    //       meta: response.meta,
    //     },
    //   },
    // };

    yield put({
      type: ACTION_TYPES.SAVE_LOAD_SUCCESS,
      // entities: profile,
    });
  } catch (error) {
    yield put(APP_ACTIONS.setNotification(error, 'error'));
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

    const normalizedPasses = normalize(response.data.passes, [Schema.passes]);

    const normalizedShipper = normalize(response.data.shipper, Schema.shippers);

    yield put({
      type: ACTION_TYPES.FETCH_LOAD_ADD_DATA_SUCCESS,
      entities: {
        ...normalizedTrailers.entities,
        ...normalizedPackaging.entities,
        ...normalizedPasses.entities,
        ...normalizedShipper.entities,
      },
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_LOAD_ADD_DATA_FAILURE, error});
  }
}

function* saveLoadMonitor() {
  yield takeLatest(ACTION_TYPES.SAVE_LOAD_REQUEST, saveLoad);
}

function* fetchLoadAddDataMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_LOAD_ADD_DATA_REQUEST, fetchLoadAdd);
}

export const sagas = all([
  fork(fetchLoadAddDataMonitor),
  fork(saveLoadMonitor),
]);
