import io from 'socket.io-client';
import {all, call, cancel, fork, put, select, take} from 'redux-saga/effects';
import {SOCKET_SERVER} from 'utils/env';
import {eventChannel} from 'redux-saga';

import {ACTION_TYPES as CUSTOMER_ACTIONS} from 'customer/common/actions';

import {ACTION_TYPES as AUTH_ACTIONS} from 'guest/common/actions';
import {SELECTORS as AUTH_SELECTORS} from 'guest/common/selectors';

function connect() {
  const socket = io(SOCKET_SERVER);
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('location.updated', data => {
      console.log('location.updated', data);
      emit({
        type: CUSTOMER_ACTIONS.LOCATION_RECEIVED,
        payload: data,
      });
    });
    return () => {};
  });
}

// read from server
function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* syncUserToSocket(socket) {
  const state = yield select();
  const userID = AUTH_SELECTORS.getAuthUserID(state);
  while (true) {
    yield take(AUTH_ACTIONS.SYNC_USER_TO_SOCKET);
    socket.emit('user.connected', userID);
  }
}

function* subscribeToTripTrack(socket) {
  while (true) {
    const threadParams = yield take(
      CUSTOMER_ACTIONS.SUBSCRIBE_TO_TRIP_TRACK_CHANNEL,
    );
    socket.emit('trip.track.subscribe', threadParams.params.trip_id);
  }
}

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(syncUserToSocket, socket);
  yield fork(subscribeToTripTrack, socket);
}

function* socketFlowMonitor() {
  while (true) {
    yield take(AUTH_ACTIONS.LOGIN_SUCCESS);

    const socket = yield call(connect);

    const task = yield fork(handleIO, socket);

    yield take(AUTH_ACTIONS.LOGOUT);
    yield cancel(task);
    socket.emit('logout');
  }
}

export const sagas = all([fork(socketFlowMonitor)]);
