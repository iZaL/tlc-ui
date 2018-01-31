import {sagas as app} from 'app/sagas/app';
import {sagas as countries} from 'app/sagas/countries';
import {sagas as socket} from 'app/sagas/socket';

import {all} from 'redux-saga/effects';

export const sagas = all([app, countries, socket]);
