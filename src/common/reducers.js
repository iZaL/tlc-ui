import Navigator from 'common/navigator';
import appReducer from 'app/common/reducer';
import authReducer from 'auth/common/reducer';
import entities from 'common/entities';
import {combineReducers} from 'redux';

const navReducer = (state, action) => {
  const newState = Navigator.router.getStateForAction(action, state);
  return newState || state;
};

const rootReducer = combineReducers({
  navigation: navReducer,
  appReducer,
  authReducer,
  entities,
});

export default rootReducer;
