import {createSelector} from 'reselect';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';
import {denormalize} from 'normalizr';
import {Schema} from 'utils/schema';

const entities = state => state.entities;
const countriesSchema = state => state.entities.countries;
const shipperLocationsSchema = state => state.entities.shipper_locations;
const loadsSchema = state => state.entities.loads;
const getIdProp = ({}, itemID) => itemID;
const getTrackings = state => state.shipper.trackings;

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

const getLoadByID = () => {
  return createSelector([entities, getIdProp], (schema, id) =>
    denormalize(id, Schema.loads, schema),
  );
};

const getLoads = createSelector(
  [entities, getProfile, loadsSchema],
  (schema, shipper, loads) => {
    let shipperLoads =
      Object.keys(loads)
        .map(loadID => loads[loadID])
        .filter(load => load.shipper === shipper.id) || [];
    return shipperLoads.map(load => denormalize(load.id, Schema.loads, schema));
  },
);

const getLoadsByStatus = () => {
  return createSelector([getLoads, getIdProp], (loads, status) =>
    loads.filter(load => load.status === status),
  );
};

const getLocationUpdatesForTrip = () => {
  return createSelector(
    [getTrackings, getIdProp],
    (tracking, trip) => tracking[trip] || {},
  );
};

export const SELECTORS = {
  getProfile,
  getEmployees,
  getLocationsByType,
  getLoadsByStatus,
  getLocations,
  getLoads,
  getLocationUpdatesForTrip,
};
