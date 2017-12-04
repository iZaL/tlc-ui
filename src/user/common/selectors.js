import {createSelector} from 'reselect';

const authToken = state => state.userReducer.token;
const isAuthenticated = state => state.userReducer.isAuthenticated;
const authUserID = state => state.userReducer.userID;

const getCurrentUserID = createSelector(authUserID, userID => userID);
const getAuthToken = createSelector(authToken, token => token);
// const getCurrentUser = createSelector(
//   ormReducer,
//   isAuthenticated,
//   authUserID,
//   ormSelector(orm, ({User}, authenticated, userID) => {
//     return authenticated ? User.withId(userID).ref : null;
//   }),
// );

//@fixme: get current user
export const SELECTORS = {
  isAuthenticated,
  // getCurrentUser,
  getCurrentUserID,
  getAuthToken,
};
