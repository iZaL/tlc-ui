import {createSelector} from 'reselect';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';

const truckMakesSchema = state => state.entities.truck_makes;
const truckModelsSchema = state => state.entities.truck_models;
const driversSchema = state => state.entities.drivers;
const trailersSchema = state => state.entities.trailers;
const routesSchema = state => state.entities.routes;
const trucksSchema = state => state.entities.trucks;
const countriesSchema = state => state.entities.countries;
const getIdProp = ({}, itemID) => itemID;

const getProfile = createSelector(
  [USER_SELECTORS.getAuthUserProfile, countriesSchema],
  (driver, countries) => {
    return {
      ...driver,
      nationality: countries[driver.nationality],
      residence: countries[driver.residence],
    };
  },
);

const getTruck = createSelector(
  [
    USER_SELECTORS.getAuthUserProfile,
    trucksSchema,
    truckMakesSchema,
    truckModelsSchema,
    trailersSchema,
    driversSchema,
  ],
  (driver, trucks, truckMakes, truckModels, trailers, drivers) => {
    let truck = trucks[driver.truck];
    return (
      (truck && {
        ...truck,
        make: truckMakes[truck.make],
        model: truckModels[truck.model],
        trailer: trailers[truck.trailer],
        driver: drivers[truck.driver],
      }) ||
      {}
    );
  },
);

const getTrailer = createSelector([getTruck], truck => truck.trailer || {});

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
  [getProfile, routesSchema, countriesSchema],
  (driver, routes, countries) => {
    let loadingRoutes = driver.residence.loading_routes || [];
    const getRoutes = getRouteByID();
    return (
      loadingRoutes.map(routeID => {
        return getRoutes({entities: {routes, countries}}, routeID);
      }) || []
    );
  },
);

const getLicenses= createSelector(
  [
    USER_SELECTORS.getAuthUserProfile,
  ],
  (driver) => driver.licenses || []
);

const getVisas = createSelector(
  [
    USER_SELECTORS.getAuthUserProfile,
  ],
  (driver) =>  driver.visas || []
);

export const SELECTORS = {
  getProfile,
  getTruck,
  getTrailer,
  getRouteByID,
  getAvailableRoutes,
  getLicenses,
  getVisas,
};
