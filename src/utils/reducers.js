import {reducer as app, entities} from 'app/common/reducer';
import {reducer as user} from 'guest/common/reducer';
import {reducer as driver} from 'driver/reducers';
import {reducer as shipper} from 'shipper/reducers';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  app,
  user,
  // driver,
  shipper,
  entities,
});

export default rootReducer;
