import {createSelector} from 'reselect';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';

const getAvailableRoutes = createSelector(
  [USER_SELECTORS.getAuthUserProfile],
  (driver) => driver.loading_routes || []);

const getTruck = createSelector(
  [USER_SELECTORS.getAuthUserProfile],
  (driver) => driver.truck || {});

const getTrailer = createSelector(
  [getTruck],
  (truck) => truck.trailer || {});

export const SELECTORS = {
  getAvailableRoutes,
  getTruck,
  getTrailer
};
