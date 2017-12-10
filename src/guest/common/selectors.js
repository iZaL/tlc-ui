import {createSelector} from 'reselect';

const getAuthToken = state => state.user.token;
const isAuthenticated = state => state.user.isAuthenticated;
const getAuthUserID = state => state.user.userID;
const getAuthUserType = state => state.user.userType;
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
