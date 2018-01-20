import {createSelector} from 'reselect';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';
import flatten from 'lodash/flatten';

const countriesSchema = state => state.entities.countries;
const shipperLocationsSchema = state => state.entities.shipper_locations;
const getIdProp = ({}, itemID) => itemID;

const getProfile = createSelector(
  [USER_SELECTORS.getAuthUserProfile],
  shipper => shipper,
);

const getEmployees = createSelector(
  [USER_SELECTORS.getAuthUserProfile],
  shipper => shipper.employees || [],
);

const getLocationByID = () => {
  return createSelector(
    [shipperLocationsSchema, countriesSchema, getIdProp],
    (locations, countries, id) => {
      let location = (locations && locations[id]) || {};
      return {
        ...location,
        country: countries[location.country] || {},
      };
    },
  );
};

const getLocations = createSelector(
  [getProfile, shipperLocationsSchema, countriesSchema],
  (shipper, locations, countries) => {
    let shipperLocations = shipper.locations || [];
    const locationsByID = getLocationByID();
    return shipperLocations.map(locationID => {
      return locationsByID(
        {entities: {shipper_locations: locations, countries}},
        locationID,
      );
    });
  },
);

const getLocationsByType = () => {
  return createSelector([getLocations, getIdProp], (locations, type) =>
    locations.filter(location => location.type === type),
  );
};

export const SELECTORS = {
  getProfile,
  getEmployees,
  getLocationsByType,
  getLocations,
};
