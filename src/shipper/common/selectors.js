import {createSelector} from 'reselect';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';
import flatten from 'lodash/flatten';

const countriesSchema = state => state.entities.countries;
const getIdProp = ({}, itemID) => itemID;

const getProfile = createSelector(
  [USER_SELECTORS.getAuthUserProfile, countriesSchema],
  (shipper, countries) => {
    return {
      ...shipper,
    };
  },
);

const getEmployees = createSelector(
  [USER_SELECTORS.getAuthUserProfile],
  shipper => shipper.employees || [],
);

export const SELECTORS = {
  getProfile,
  getEmployees,
};
