import {createSelector} from 'reselect';

const getAuthToken = state => state.userReducer.token;
const isAuthenticated = state => state.userReducer.isAuthenticated;
const getAuthUserID = state => state.userReducer.userID;
const getAuthUserType = state => state.userReducer.userType;
const usersEntity = state => state.entities.users;

const getAuthUser = createSelector(
  usersEntity,
  isAuthenticated,
  getAuthUserID,
  (users, authenticated, userID) => {
    return authenticated ? users[userID] : undefined;
  },
);
export const SELECTORS = {
  isAuthenticated,
  getAuthUser,
  getAuthUserID,
  getAuthUserType,
  getAuthToken,
};
