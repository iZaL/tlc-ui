import {createSelector} from 'reselect';
import {SELECTORS as USER_SELECTORS} from 'driver/common/selectors';

// const isAuthenticated = state => state.user.isAuthenticated;
// const getAuthUserID = state => state.user.id;
// const getAuthUserType = state => state.user.type;
const countriesEntity = state => state.entities.users;

const getAuthUser = createSelector(
  USER_SELECTORS.getAuthUser,
  countriesEntity,
  (user,countries) => {
    return {
      ...user,
      profile:{
        ...user.profile,
        nationality
      }
    };
  },
);

export const SELECTORS = {
  isAuthenticated,
  getAuthUser,
  getAuthUserType,
};
