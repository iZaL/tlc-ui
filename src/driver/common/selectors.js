import {createSelector} from 'reselect';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';
import {Schema} from 'utils/schema';
import {denormalize} from 'normalizr';

const truckMakesSchema = state => state.entities.truck_makes;
const truckModelsSchema = state => state.entities.truck_models;
const driversSchema = state => state.entities.drivers;
const trailersSchema = state => state.entities.trailers;
const routesSchema = state => state.entities.routes;
const trucksSchema = state => state.entities.trucks;
const countriesSchema = state => state.entities.countries;

const getIdProp = ({}, itemID) => itemID;

const getAvailableRoutes = createSelector(
  [USER_SELECTORS.getAuthUserProfile],
  (driver) => driver.residence.loading_routes || []);

const getProfile = createSelector(
  [USER_SELECTORS.getAuthUserProfile, countriesSchema],
  (driver, countries) => {
    return {
      ...driver,
      nationality: countries[driver.nationality],
      residence: countries[driver.residence],
    }
  }
);

const getTruck = createSelector(
  [USER_SELECTORS.getAuthUserProfile, trucksSchema, truckMakesSchema, truckModelsSchema,trailersSchema,driversSchema],
  (driver, trucks, truckMakes, truckModels,trailers,drivers) => {
    let truck = trucks[driver.truck];
    return truck && {
      ...truck,
      make: truckMakes[truck.make],
      model: truckModels[truck.model],
      trailer: trailers[truck.trailer],
      driver:drivers[truck.driver]
    } || {}
  });

const getRoutes = createSelector(
  [USER_SELECTORS.getAuthUserProfile],
  (driver) => driver.routes || {});

const getTrailer = createSelector(
  [getTruck],
  (truck) => truck.trailer || {});

const getDriver = createSelector(
  [getTruck],
  (truck) => truck.driver || {});

const getRouteByID = () => {
  return createSelector([routesSchema, countriesSchema, getIdProp], (routes, countries, routeID) => {
      let route = routes[routeID];
      return {
        ...route,
        origin: countries[route.origin],
        destination: countries[route.destination],
        transits: route.transits ? route.transits.map(countryID => countries[countryID]) : []
      }
    }
  );
};

export const SELECTORS = {
  getAvailableRoutes,
  getRoutes,
  getTruck,
  getTrailer,
  getRouteByID,
  getProfile,
};
