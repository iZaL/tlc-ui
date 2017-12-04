import {ACTION_TYPES} from './actions';
import {createRootNavigator} from "common/navigator";

export const COUNTRY_KEY = 'COUNTRY_KEY';
export const BOOTSTRAPPED_STORAGE_KEY = 'BOOTSTRAPPED';
export const LANGUAGE_STORAGE_KEY = 'APP_LOCALE';
export const PUSH_TOKEN_KEY = 'PUSH_TOKEN_KEY';

import Store from 'common/store';
const store = Store && Store.getState();
const isAuthenticated = store ? store.authReducer.isAuthenticated : false;

const initialState = {
  bootstrapped: false,
  booted: false,
  notifications: {
    message: null,
    messageType: null,
  },
  language: 'en',
};

export function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.BOOTSTRAPPED:
      return {...state, bootstrapped: action.value};
    case ACTION_TYPES.BOOT_REQUEST:
      return {...state, booted: false};
    case ACTION_TYPES.BOOT_SUCCESS:
      return {...state, booted: true};
    case ACTION_TYPES.SET_NOTIFICATION:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          message: action.payload.message,
          messageType: action.payload.messageType,
        },
      };
    case ACTION_TYPES.DISMISS_NOTIFICATION:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          message: null,
          type: null,
        },
      };
    case ACTION_TYPES.SET_LANGUAGE_SUCCESS:
      return {
        ...state,
        language: action.language,
      };
    default:
      return state;
  }
}
//
// const ActionForLoggedOut = Navigator.router.getActionForPathAndParams("Auth");
// const ActionForLoggedIn = Navigator.router.getActionForPathAndParams("Main");
//
// const stateForLoggedOut = Navigator.router.getStateForAction(ActionForLoggedOut);
// const stateForLoggedIn = Navigator.router.getStateForAction(ActionForLoggedIn);

// const initialStateForNav = { stateForLoggedOut, stateForLoggedIn };

// export const navReducer = (state, action) => {
//   switch (action.type) {
//     // case "BOOT_REQUEST":
//     //   return {
//     //     ...state,
//     //     stateForLoggedIn: Navigator.router.getStateForAction(ActionForLoggedIn, stateForLoggedOut)
//     //   };
//     //
//     case "LOGIN_SUCCESS":
//       return Navigator.router.getStateForAction(ActionForLoggedIn, stateForLoggedOut);
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
//       return  Navigator.router.getStateForAction(ActionForLoggedOut,stateForLoggedIn);
//   }
// };

export const navReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS": {
      let Navigator = createRootNavigator(isAuthenticated);
      return  Navigator.router.getStateForAction(action, state);
      // return newState;
    }
    default:
      // console.log('isAuthenticated',isAuthenticated);
      let Navigator = createRootNavigator(false);
      let newState = Navigator.router.getStateForAction(action, state);
      return newState || state;
  }
};
