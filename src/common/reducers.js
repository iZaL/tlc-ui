import Navigator from 'common/navigator';
import appReducer from 'app/common/reducer';
import authReducer from 'auth/common/reducer';
import entities from 'common/entities';
import {combineReducers} from 'redux';
// import NavigationActions from "react-navigation/src/NavigationActions";
//
// const ActionForLoggedOut = Navigator.router.getActionForPathAndParams("Auth");
// const ActionForLoggedIn = Navigator.router.getActionForPathAndParams("Main");
//
// const stateForLoggedOut = Navigator.router.getStateForAction(ActionForLoggedOut);
// const stateForLoggedIn = Navigator.router.getStateForAction(ActionForLoggedIn);
//
// const initialState = { stateForLoggedOut, stateForLoggedIn };

// const navReducer = (state = initialState, action) => {
//   switch (action.type) {
//     // case "BOOT_REQUEST":
//     //   return {
//     //     ...state,
//     //     stateForLoggedIn: Navigator.router.getStateForAction(ActionForLoggedIn, stateForLoggedOut)
//     //   };
//     //
//     // case "LOGIN_SUCCESS":
//     //   return {
//     //     ...state,
//     //     stateForLoggedIn: Navigator.router.getStateForAction(ActionForLoggedIn, stateForLoggedOut)
//     //   };
//     //
//     // case "LOGOUT":
//     //   return {
//     //     ...state,
//     //     stateForLoggedOut: Navigator.router.getStateForAction(
//     //       NavigationActions.reset({
//     //         index: 0,
//     //         actions: [NavigationActions.navigate({ routeName: "Auth" })]
//     //       })
//     //     )
//     //   };
//
//     default:
//       return {
//         ...state,
//         stateForLoggedIn: Navigator.router.getStateForAction(action,state.stateForLoggedIn)
//       };
//   }
// };

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
