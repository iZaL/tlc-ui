import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {API} from 'driver/common/api';
import {ACTION_TYPES} from 'driver/common/actions';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import {ACTIONS as APP_ACTIONS} from "app/common/actions";
import I18n from 'utils/locale';

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

function* fetchTripDetails(action) {
  try {
    const response = yield call(API.fetchTripDetails, action.params);

    // const data = {
    //   ...response.load,
    //   trips: [response.trip],
    // };
    const normalized = normalize(response.data, Schema.loads);

    yield put({
      type: ACTION_TYPES.FETCH_TRIP_DETAILS_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_TRIP_DETAILS_FAILURE, error});
  }
}

function* fetchDocumentTypes(action) {
  try {
    const response = yield call(API.fetchDocumentTypes, action.params);
    const normalized = normalize(response.data, [Schema.document_types]);

    yield put({
      type: ACTION_TYPES.FETCH_DOCUMENT_TYPES_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_DOCUMENT_TYPES_FAILURE, error});
  }
}

function* setTripStatus(action) {
  const {
    params: {resolve, reject, ...rest},
  } = action;

  try {
    let params = {
      body: {
        ...rest,
      },
    };

    const response = yield call(API.setTripStatus, params);
    const normalized = normalize(response.data, Schema.loads);

    console.log('normalized',normalized);

    yield put({
      type: ACTION_TYPES.SET_TRIP_STATUS_SUCCESS,
      entities: normalized.entities,
    });

    yield put(
      APP_ACTIONS.setNotification({
        message: I18n.t('success'),
      }),
    );
    yield resolve(response.data);
  } catch (error) {
    yield put(
      APP_ACTIONS.setNotification({
        message: error,
        type: 'error',
      }),
    );
    yield put({type: ACTION_TYPES.SET_TRIP_STATUS_FAILURE, error});
    yield reject(error);
  }
}

function* fetchUpcomingTripsMonitor() {
  yield takeLatest(
    ACTION_TYPES.FETCH_UPCOMING_TRIPS_REQUEST,
    fetchUpcomingTrips,
  );
}

function* fetchTripDetailsMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_TRIP_DETAILS_REQUEST, fetchTripDetails);
}

function* fetchDocumentTypesMonitor() {
  yield takeLatest(
    ACTION_TYPES.FETCH_DOCUMENT_TYPES_REQUEST,
    fetchDocumentTypes,
  );
}

function* setTripStatusMonitor() {
  yield takeLatest(
    ACTION_TYPES.SET_TRIP_STATUS_REQUEST,
    setTripStatus,
  );
}

export const sagas = all([
  fork(fetchUpcomingTripsMonitor),
  fork(fetchTripDetailsMonitor),
  fork(fetchDocumentTypesMonitor),
  fork(setTripStatusMonitor),
]);
