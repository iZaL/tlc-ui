import {sagas as APP_SAGA} from 'app/sagas';
import {sagas as AUTH_SAGA} from 'guest/common/sagas';
import {sagas as DRIVER_SAGAS} from 'driver/sagas';
import {sagas as TRUCK_SAGAS} from 'trucks/common/sagas';
import {all} from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([APP_SAGA, AUTH_SAGA, DRIVER_SAGAS,TRUCK_SAGAS]);
}
