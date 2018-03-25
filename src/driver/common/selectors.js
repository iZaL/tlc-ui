import {createSelector} from 'reselect';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';
import flatten from 'lodash/flatten';
import {denormalize} from 'normalizr';
import {Schema} from 'utils/schema';

const entities = state => state.entities;

const truckMakesSchema = state => state.entities.truck_makes;
const truckModelsSchema = state => state.entities.truck_models;
const driversSchema = state => state.entities.drivers;
const trailersSchema = state => state.entities.trailers;
const routesSchema = state => state.entities.routes;
const trucksSchema = state => state.entities.trucks;
const countriesSchema = state => state.entities.countries;
const loadsSchema = state => state.entities.loads;
const tripsSchema = state => state.entities.trips;
const getIdProp = ({}, itemID) => itemID;

const getProfile = createSelector(
  [USER_SELECTORS.getAuthUserProfile, countriesSchema],
  (driver, countries) => {
    return {
      ...driver,
      nationality: countries[driver.nationality],
      residencies: driver.residencies || [],
      // residencies:
      //   (driver.residencies &&
      //     driver.residencies.map(residency => countries[residency])) ||
      //   [],
    };
  },
);

const getTruck = createSelector(
  [
    getProfile,
    trucksSchema,
    truckMakesSchema,
    truckModelsSchema,
    trailersSchema,
    driversSchema,
    countriesSchema,
  ],
  (driver, trucks, truckMakes, truckModels, trailers, drivers, countries) => {
    let truck = trucks[driver.truck];
    return (
      (truck && {
        ...truck,
        make: truckMakes[truck.make],
        model: truckModels[truck.model],
        trailer: trailers[truck.trailer],
        driver: drivers[truck.driver],
        registration_country: countries[truck.registration_country],
      }) ||
      {}
    );
  },
);

const getTrailer = createSelector([getTruck], truck => truck.trailer || {});

const getLoadByID = () => {
  return createSelector(
    [loadsSchema, countriesSchema, trailersSchema, getIdProp],
    (loads, countries, trailers, loadID) => {
      let load = loads[loadID];

      let loadOrigin = load.origin || {};
      let origin = {
        ...loadOrigin,
        country: loadOrigin.country ? countries[loadOrigin.country] : {},
      };

      let loadDestination = load.destination || {};
      let destination = {
        ...loadDestination,
        country: loadDestination.country
          ? countries[loadDestination.country]
          : {},
      };

      return {
        ...load,
        origin: origin,
        destination: destination,
        trailer: trailers[load.trailer] || {},
      };
    },
  );
};

const getRouteByID = () => {
  return createSelector(
    [routesSchema, countriesSchema, getIdProp],
    (routes, countries, routeID) => {
      let route = routes[routeID];
      return {
        ...route,
        origin: countries[route.origin],
        destination: countries[route.destination],
        transits: route.transits
          ? route.transits.map(countryID => countries[countryID])
          : [],
      };
    },
  );
};

const getAvailableRoutes = createSelector(
  [getTruck, routesSchema, countriesSchema],
  (truck, routes, countries) => {
    let loadingRoutes = truck.registration_country
      ? truck.registration_country.loading_routes
      : [];
    const routeByID = getRouteByID();
    return (
      loadingRoutes.map(routeID => {
        return routeByID({entities: {routes, countries}}, routeID);
      }) || []
    );
  },
);

const getRoutes = createSelector(
  [getProfile, routesSchema, countriesSchema],
  (driver, routes, countries) => {
    let loadingRoutes = driver.routes || [];
    const routeByID = getRouteByID();
    return (
      loadingRoutes.map(routeID => {
        return routeByID({entities: {routes, countries}}, routeID);
      }) || []
    );
  },
);

const getLicenses = createSelector(
  [USER_SELECTORS.getAuthUserProfile],
  driver => driver.licenses || [],
);

const getVisas = createSelector(
  [USER_SELECTORS.getAuthUserProfile],
  driver => driver.visas || [],
);

/**
 * Get all countries related to the driver,
 * Residence,
 * Nationality,
 * Routes Countries (Origin,Destination),
 * Route Transit (Origin,Destination)
 * @return [Countries]
 */
const getProfileCountries = createSelector(
  [getProfile, getRoutes],
  ({nationality, residencies, licenses, visas}, profileRoutes) => {
    let routes = flatten(
      profileRoutes.map(profile => [
        profile.origin,
        profile.destination,
        ...profile.transits,
      ]),
    );
    const countries = [...new Set([nationality, ...residencies, ...routes])];
    return countries.map(country => {
      return {
        ...country,
        license:
          (licenses &&
            licenses.find(license => license.country === country.id)) ||
          {},
        visa:
          (visas && visas.find(license => license.country === country.id)) ||
          {},
      };
    });
  },
);

const getLoadRequests = createSelector(
  [getProfile, loadsSchema, countriesSchema, trailersSchema],
  (driver, loads, countries, trailers) => {
    let driverLoads = driver.loads || [];
    const loadByID = getLoadByID();
    return (
      driverLoads.map(loadID => {
        return loadByID({entities: {loads, countries, trailers}}, loadID);
      }) || []
    );
  },
);

const getTripByID = () => {
  return createSelector(
    [tripsSchema, loadsSchema, countriesSchema, trailersSchema, getIdProp],
    (trips, loads, countries, trailers, id) => {
      let trip = trips[id];
      const loadByID = getLoadByID();
      return {
        ...trip,
        load: loadByID({entities: {loads, countries, trailers}}, trip.load),
      };
    },
  );
};

const getUpcomingTrips = createSelector(
  [getProfile, tripsSchema, loadsSchema, countriesSchema, trailersSchema],
  (driver, trips, loads, countries, trailers) => {
    let upcomingTrips = driver.upcoming_trips || [];

    const tripByID = getTripByID();
    return (
      upcomingTrips.map(id => {
        return tripByID({entities: {trips, loads, countries, trailers}}, id);
      }) || []
    );
  },
);

//@todo: Get correct driver loads
const getLoads = createSelector(
  [entities, getProfile, loadsSchema],
  (schema, driver, loads) => {
    let driverLoads = Object.keys(loads).map(loadID => loads[loadID]) || [];
    return driverLoads.map(load => denormalize(load.id, Schema.loads, schema));
  },
);

const getLoadsByStatus = () => {
  return createSelector([getLoads, getIdProp], (loads, status) =>
    loads.filter(load => load.status === status),
  );
};

const getResidencies = createSelector(
  [getProfile, countriesSchema],
  (driver, countries) => {
    return driver.residencies.map(residency => {
      return {
        ...residency,
        country: countries[residency.country],
      };
    });
  },
);

export const SELECTORS = {
  getProfile,
  getResidencies,
  getTruck,
  getTrailer,
  getRouteByID,
  getAvailableRoutes,
  getRoutes,
  getLicenses,
  getVisas,
  getProfileCountries,
  getLoadRequests,
  getLoadByID,
  getUpcomingTrips,
  getLoadsByStatus,
};
