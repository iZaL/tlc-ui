import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {API} from 'customer/common/api';
import {ACTION_TYPES} from 'customer/common/actions';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import I18n from 'utils/locale';

function* fetchLocations() {
  try {
    const response = yield call(API.fetchLocations);
    const normalized = normalize(response.data, Schema.customers);
    const {entities} = normalized;

    yield put({
      type: ACTION_TYPES.FETCH_LOCATIONS_SUCCESS,
      entities: entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_LOCATIONS_FAILURE, error});
  }
}

function* saveAddress(action) {
  const {address, resolve, reject} = action.payload;

  try {
    const params = {
      body: {
        ...address,
      },
    };

    const response = yield call(API.saveAddress, params);
    const normalized = normalize(response.data, Schema.customers);
    yield put({
      type: ACTION_TYPES.SAVE_ADDRESS_SUCCESS,
      entities: normalized.entities,
    });

    yield resolve(response.address_id);
  } catch (error) {
    yield put({type: ACTION_TYPES.SAVE_ADDRESS_FAILURE, error});
    yield put(
      APP_ACTIONS.setNotification({
        message: I18n.t('address_save_failure'),
        type: 'error',
      }),
    );
    yield reject(error);
  }
}

function* fetchLocationsMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_LOCATIONS_REQUEST, fetchLocations);
}

function* saveAddressMonitor() {
  yield takeLatest(ACTION_TYPES.SAVE_ADDRESS_REQUEST, saveAddress);
}

export const sagas = all([
  fork(fetchLocationsMonitor),
  fork(saveAddressMonitor),
]);
