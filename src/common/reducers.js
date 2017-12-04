
import {appReducer,navReducer} from 'app/common/reducer';
import {authReducer} from 'auth/common/reducer';
import {entities} from 'common/entities';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  // navigation: navReducer,
  appReducer,
  authReducer,
  entities,
});

export default rootReducer;
