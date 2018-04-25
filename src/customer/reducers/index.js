import {combineReducers} from 'redux';
import {reducer as loads} from 'customer/reducers/loads';
import {reducer as trackings} from 'customer/reducers/trackings';
// import {reducer as drivers} from 'customer/reducers/drivers';

export const reducer = combineReducers({loads, trackings});
