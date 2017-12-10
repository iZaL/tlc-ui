import {sagas as app} from 'app/sagas/app';
import {sagas as countries} from 'app/sagas/countries';
import {all} from 'redux-saga/effects';

export const sagas = all([app,countries]);
