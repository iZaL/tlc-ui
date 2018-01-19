import {sagas as profile} from 'shipper/sagas/profile';
import {sagas as employee} from 'shipper/sagas/employee';
import {all} from 'redux-saga/effects';

export const sagas = all([profile, employee]);
