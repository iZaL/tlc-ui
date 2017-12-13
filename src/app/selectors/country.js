import map from 'lodash/map';
import {createSelector} from 'reselect';
import {denormalize} from 'normalizr';
import {Schema} from 'utils/schema';

const entities = state => state.entities;
const countriesModel = state => state.entities.countries;
// const timingsEntity = state => state.entities.timings;
// const addressesEntity = state => state.entities.addresses;

const getCountries = createSelector(
  [entities, countriesModel],
  (schema, collection) => {
    return Object.keys(collection).map(id =>
      denormalize(id, Schema.countries, schema),
    );
  },
);

export const SELECTORS = {
  getCountries,
};
