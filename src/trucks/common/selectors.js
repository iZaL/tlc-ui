import map from 'lodash/map';
import {createSelector} from 'reselect';
import {denormalize} from 'normalizr';
import {Schema} from 'utils/schema';

const entities = state => state.entities;
const truckMakesSchema = state => state.entities.truck_makes;
const truckModelsSchema = state => state.entities.truck_models;
const trailerMakesSchema = state => state.entities.trailer_makes;
const trailersSchema = state => state.entities.trailers;
// const timingsEntity = state => state.entities.timings;
// const addressesEntity = state => state.entities.addresses;

const getTruckMakes = createSelector(
  [entities, truckMakesSchema],
  (schema, collection) => {
    return Object.keys(collection).map(id =>
      denormalize(id, Schema.truck_makes, schema),
    );
  },
);

const getTrailerMakes = createSelector(
  [entities, trailerMakesSchema],
  (schema, collection) => {
    return Object.keys(collection).map(id =>
      denormalize(id, Schema.trailer_makes, schema),
    );
  },
);

const getTrailers = createSelector(
  [entities, trailersSchema],
  (schema, collection) => {
    return Object.keys(collection).map(id =>
      denormalize(id, Schema.trailers, schema),
    );
  },
);

const getTruckModels = createSelector(
  [entities, truckModelsSchema],
  (schema, collection) => {
    return Object.keys(collection).map(id =>
      denormalize(id, Schema.truck_models, schema),
    );
  },
);

export const SELECTORS = {
  getTruckMakes,
  getTruckModels,
  getTrailerMakes,
  getTrailers
};
