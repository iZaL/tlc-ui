import {sagas as profile} from 'customer/sagas/profile';
import {sagas as employee} from 'customer/sagas/employee';
import {sagas as location} from 'customer/sagas/location';
import {sagas as load} from 'customer/sagas/load';
import {sagas as trip} from 'customer/sagas/trip';
import {all} from 'redux-saga/effects';

export const sagas = all([profile, employee, location, load, trip]);
