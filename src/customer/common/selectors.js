import {createSelector} from 'reselect';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';
import {denormalize} from 'normalizr';
import {Schema} from 'utils/schema';

const entities = state => state.entities;
const countriesSchema = state => state.entities.countries;
const customerLocationsSchema = state => state.entities.customer_locations;
const loadsSchema = state => state.entities.loads;
const getIdProp = ({}, itemID) => itemID;
const getTrackings = state => state.customer.trackings;
const driversSchema = state => state.entities.drivers;
const addData = state => state.customer.loads.add;
const getLoadDrivers = state => state.customer.loads.loadDrivers;
const customersSchema = state => state.entities.customers;

const getProfile = createSelector(
  [USER_SELECTORS.getAuthUserProfile],
  customer => customer,
);

const getEmployees = createSelector(
  [USER_SELECTORS.getAuthUserProfile],
  customer => customer.employees || [],
);

const getLocationByID = () => {
  return createSelector(
    [customerLocationsSchema, countriesSchema, getIdProp],
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
  [getProfile, customerLocationsSchema, countriesSchema],
  (customer, locations, countries) => {
    let customerLocations = customer.locations || [];
    const locationsByID = getLocationByID();
    return customerLocations.map(locationID => {
      return locationsByID(
        {entities: {customer_locations: locations, countries}},
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

const getBlockedDrivers = createSelector(
  [entities, getProfile],
  (schema, profile) =>
    (profile.blocked_drivers &&
      profile.blocked_drivers.map(driver =>
        denormalize(driver, Schema.drivers, schema),
      )) ||
    [],
);

const getDrivers = createSelector(
  [entities, driversSchema],
  (schema, drivers) => {
    if (drivers) {
      return Object.keys(drivers).map(driver =>
        denormalize(driver, Schema.drivers, schema),
      );
    }
    return [];
  },
);

const getLoadByID = () => {
  return createSelector([entities, getIdProp], (schema, id) =>
    denormalize(id, Schema.loads, schema),
  );
};

const getDriverByID = () => {
  return createSelector([entities, getIdProp], (schema, id) =>
    denormalize(id, Schema.drivers, schema),
  );
};

const getLoads = createSelector(
  [entities, getProfile, loadsSchema],
  (schema, customer, loads) => {
    let customerLoads =
      Object.keys(loads)
        .map(loadID => loads[loadID])
        .filter(load => load.customer === customer.id) || [];
    return customerLoads.map(load =>
      denormalize(load.id, Schema.loads, schema),
    );
  },
);

const getLoadsByStatus = () => {
  return createSelector(
    [getProfile, customersSchema, entities, getIdProp],
    (profile, customersEntity, schema, status) => {
      let customer = customersEntity[profile.id];
      let loads = (customer.loads && customer.loads[status]) || [];
      return loads.map(load => denormalize(load, Schema.loads, schema));
    },
  );
};

const getLocationUpdatesForTrip = () => {
  return createSelector(
    [getTrackings, getIdProp],
    (tracking, trip) => tracking[trip] || {},
  );
};

const getAddData = createSelector(addData, data => data);

const getDriversForLoad = () => {
  return createSelector(
    [entities, getLoadDrivers, getIdProp],
    (schema, loadDrivers, loadID) => {
      let drivers = loadDrivers[loadID];
      if (drivers) {
        return drivers.map(driver =>
          denormalize(driver, Schema.drivers, schema),
        );
      }
      return [];
    },
  );
};

const getTripByID = () => {
  return createSelector([entities, getIdProp], (schema, id) =>
    denormalize(id, Schema.trips, schema),
  );
};

const getCurrentLoad = createSelector(
  [getProfile, entities],
  (customer, schema) => {
    return denormalize(customer.current_load, Schema.loads, schema);
  },
);

export const SELECTORS = {
  getProfile,
  getEmployees,
  getLocationsByType,
  getLoadsByStatus,
  getLocations,
  getLoads,
  getLocationUpdatesForTrip,
  getBlockedDrivers,
  getDrivers,
  getAddData,
  getDriversForLoad,
  getLoadByID,
  getDriverByID,
  getTripByID,
  getCurrentLoad,
};
