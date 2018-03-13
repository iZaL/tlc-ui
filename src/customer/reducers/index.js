import {combineReducers} from 'redux';
import {reducer as loads} from 'customer/reducers/loads';
import {reducer as trackings} from 'customer/reducers/trackings';

export const reducer = combineReducers({loads, trackings});
