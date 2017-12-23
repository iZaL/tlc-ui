import {createSelector} from 'reselect';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';

const getAvailableRoutes = createSelector(
  [USER_SELECTORS.getAuthUserProfile],
  (driver) => driver.residence.loading_routes || []);

const getTruck = createSelector(
  [USER_SELECTORS.getAuthUserProfile],
  (driver) => driver.truck || {});

const getRoutes = createSelector(
  [USER_SELECTORS.getAuthUserProfile],
  (driver) => driver.routes || {});

const getTrailer = createSelector(
  [getTruck],
  (truck) => truck.trailer || {});

export const SELECTORS = {
  getAvailableRoutes,
  getRoutes,
  getTruck,
  getTrailer
};
