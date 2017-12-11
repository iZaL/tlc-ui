import {sagas as profile} from 'driver/sagas/profile';
import {all} from 'redux-saga/effects';

export const sagas = all([profile]);
