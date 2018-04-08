import map from 'lodash/map';
import {createSelector} from 'reselect';
import {denormalize} from 'normalizr';
import {Schema} from 'utils/schema';

const entities = state => state.entities;
const truckMakesSchema = state => state.entities.truck_makes;
const truckModelsSchema = state => state.entities.truck_models;
const trailerMakesSchema = state => state.entities.trailer_makes;
const trailerTypesSchema = state => state.entities.trailer_types;
const trailersSchema = state => state.entities.trailers;
const packagingSchema = state => state.entities.packaging;
const passesSchema = state => state.entities.passes;
const getIdProp = ({}, itemID) => itemID;

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

const getTrailerTypes = createSelector(
  [entities, trailerTypesSchema],
  (schema, collection) => {
    return Object.keys(collection).map(id =>
      denormalize(id, Schema.trailer_types, schema),
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

const getPackaging = createSelector([packagingSchema], collection => {
  return Object.keys(collection).map(id => collection[id]) || [];
});

const getPasses = createSelector(
  [entities, passesSchema],
  (schema, collection) => {
    return Object.keys(collection).map(id =>
      denormalize(id, Schema.passes, schema),
    );
  },
);

export const SELECTORS = {
  getTruckMakes,
  getTrailerMakes,
  getTrailerTypes,
  getTrailers,
  getPackaging,
  getPasses,
};
