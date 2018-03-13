import {createSelector} from 'reselect';
import {denormalize} from 'normalizr';
import {Schema} from 'utils/schema';

const schemas = state => state.entities;
const isAuthenticated = state => state.user.isAuthenticated;
const getAuthUserID = state => state.user.id;
const getAuthUserType = state => state.user.type;
const usersEntity = state => state.entities.users;

const getAuthUser = createSelector(
  schemas,
  usersEntity,
  getAuthUserID,
  (entities, users, userID) => {
    return userID ? users[userID] : {};
  },
);

/**
 * for driver, customer
 */
const getAuthUserProfile = createSelector(
  schemas,
  getAuthUser,
  (entities, user) => {
    let {id, schema} = user.profile;
    return entities[schema][id];
  },
);

const getAuthUserWithProfile = createSelector(
  [getAuthUser, getAuthUserProfile],
  (user, profile) => {
    return {
      ...user,
      profile,
    };
  },
);

//
// const getUsers = createSelector(schemas, usersEntity, (entities, users) => {
//   return Object.keys(users).map(id => denormalize(id, Schema.users, entities));
// });

export const SELECTORS = {
  isAuthenticated,
  getAuthUser,
  getAuthUserID,
  getAuthUserProfile,
  getAuthUserWithProfile,
  getAuthUserType,
  // getUsers,
};
