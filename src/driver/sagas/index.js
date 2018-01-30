import {sagas as profile} from 'driver/sagas/profile';
import {sagas as route} from 'driver/sagas/route';
import {sagas as load} from 'driver/sagas/load';
import {sagas as trip} from 'driver/sagas/trip';
import {all} from 'redux-saga/effects';

export const sagas = all([profile, route, load, trip]);
