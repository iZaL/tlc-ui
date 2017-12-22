import {createSelector} from 'reselect';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';

const trucksSchema = state => state.entities.trucks;

const getAvailableRoutes = createSelector(()=>[]);
const getTruck = createSelector(
  [USER_SELECTORS.getAuthUserProfile,trucksSchema],
  (driver) => driver.truck || {});

export const SELECTORS = {
  getAvailableRoutes,
  getTruck
};
