import {reducer as app, entities} from 'app/common/reducer';
import {reducer as user} from 'guest/common/reducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  // navigation: navReducer,
  app,
  user,
  entities,
});

export default rootReducer;
