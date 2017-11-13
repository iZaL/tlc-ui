import {sagas as APP_SAGA} from 'app/common/sagas';
import {sagas as AUTH_SAGA} from 'auth/common/sagas';
import {sagas as ORDER_SAGA} from 'loads/common/sagas';
import {all} from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([APP_SAGA, AUTH_SAGA, ORDER_SAGA]);
}
