import {combineReducers} from 'redux';
import {reducer as loads} from 'shipper/reducers/loads';
import {reducer as trackings} from 'shipper/reducers/trackings';

export const reducer = combineReducers({loads, trackings});
