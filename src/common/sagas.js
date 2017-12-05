import {sagas as APP_SAGA} from 'app/common/sagas';
import {sagas as AUTH_SAGA} from 'user/common/sagas';
import {all} from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([APP_SAGA, AUTH_SAGA]);
}
