import {sagas as profile} from 'shipper/sagas/profile';
import {all} from 'redux-saga/effects';

export const sagas = all([profile]);
