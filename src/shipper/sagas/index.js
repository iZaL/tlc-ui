import {sagas as profile} from 'shipper/sagas/profile';
import {sagas as employee} from 'shipper/sagas/employee';
import {sagas as location} from 'shipper/sagas/location';
import {sagas as load} from 'shipper/sagas/load';
import {all} from 'redux-saga/effects';

export const sagas = all([profile, employee, location, load]);
