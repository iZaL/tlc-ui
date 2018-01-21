import {sagas as profile} from 'driver/sagas/profile';
import {sagas as routes} from 'driver/sagas/routes';
import {sagas as loads} from 'driver/sagas/loads';
import {sagas as trips} from 'driver/sagas/trips';
import {all} from 'redux-saga/effects';

export const sagas = all([profile, routes, loads, trips]);
