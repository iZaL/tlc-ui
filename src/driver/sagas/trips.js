import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {API} from 'driver/common/api';
import {ACTION_TYPES} from 'driver/common/actions';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';

function* fetchUpcomingTrips() {
  try {
    const response = yield call(API.fetchUpcomingTrips);
    const normalized = normalize(response.data, Schema.drivers);
    yield put({
      type: ACTION_TYPES.FETCH_UPCOMING_TRIPS_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_UPCOMING_TRIPS_FAILURE, error});
  }
}

function* fetchUpcomingTripsMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_UPCOMING_TRIPS_REQUEST, fetchUpcomingTrips);
}

export const sagas = all([
  fork(fetchUpcomingTripsMonitor),
]);
