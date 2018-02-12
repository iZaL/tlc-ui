import {reducer as app} from 'app/reducers/app';
import {reducer as entities} from 'app/reducers/entities';
import {reducer as notifications} from 'app/reducers/notifications';
import {reducer as user} from 'guest/common/reducer';
import {reducer as driver} from 'driver/reducers';
import {reducer as shipper} from 'shipper/reducers';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  app,
  entities,
  notifications,
  user,
  // driver,
  shipper,
});

export default rootReducer;
