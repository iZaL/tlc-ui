import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {API} from 'driver/common/api';
import {ACTION_TYPES} from 'driver/common/actions';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import {ACTIONS as APP_ACTIONS} from "app/common/actions";

function* saveRoute(action) {
  try {
    const response = yield call(API.saveRoute, action.params);
    const normalized = normalize(response.data, Schema.users);
    yield put({
      type: ACTION_TYPES.SAVE_ROUTE_SUCCESS,
      entities: normalized.entities,
    });
    // yield put({type: ACTION_TYPES.UPDATE_PROFILE_SUCCESS, payload: response.data});
  } catch (error) {
    yield put(APP_ACTIONS.setNotification(error, 'error'));
    yield put({type: ACTION_TYPES.SAVE_ROUTE_FAILURE, error});
  }
}

// function* syncRoute(action) {
//   try {
//     const response = yield call(API.saveRoute, action.params);
//     const normalized = normalize(response.data, Schema.users);
//     yield put({
//       type: ACTION_TYPES.SAVE_ROUTE_SUCCESS,
//       entities: normalized.entities,
//     });
//     // yield put({type: ACTION_TYPES.UPDATE_PROFILE_SUCCESS, payload: response.data});
//   } catch (error) {
//     yield put(APP_ACTIONS.setNotification(error, 'error'));
//     yield put({type: ACTION_TYPES.SAVE_ROUTE_FAILURE, error});
//   }
// }

function* fetchRoutes() {
  try {
    const response = yield call(API.fetchRoutes);
    const normalized = normalize(response.data, Schema.users);
    yield put({
      type: ACTION_TYPES.FETCH_ROUTES_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_ROUTES_FAILURE, error});
  }
}

function* saveRouteMonitor() {
  yield takeLatest(ACTION_TYPES.SAVE_ROUTE_REQUEST, saveRoute);
}

function* fetchRoutesMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_ROUTES_REQUEST, fetchRoutes);
}

// function* syncRouteMonitor() {
//   yield takeLatest(ACTION_TYPES.SYNC_ROUTE_REQUEST, syncRoute);
// }

export const sagas = all([fork(fetchRoutesMonitor), fork(saveRouteMonitor)]);
