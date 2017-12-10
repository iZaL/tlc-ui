import {createSelector} from 'reselect';

const isAuthenticated = state => state.user.isAuthenticated;
const getAuthUserID = state => state.user.id;
const getAuthUserType = state => state.user.type;
const usersEntity = state => state.entities.users;

const getAuthUser = createSelector(
  usersEntity,
  getAuthUserID,
  (users, userID) => {
    return userID ? users[userID] : undefined;
  },
);

export const SELECTORS = {
  isAuthenticated,
  getAuthUser,
  getAuthUserType,
};
