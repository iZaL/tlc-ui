
import {appReducer,navReducer} from 'app/common/reducer';
import {userReducer} from 'user/common/reducer';
import {entities} from 'common/entities';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  // navigation: navReducer,
  appReducer,
  userReducer,
  entities,
});

export default rootReducer;
