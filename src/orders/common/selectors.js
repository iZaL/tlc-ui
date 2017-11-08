import Schema from 'orders/common/schema';
import map from 'lodash/map';
import {createSelector} from 'reselect';
import {denormalize} from 'normalizr';

const schemas = state => state.entities;
const categoriesEntity = state => state.entities.categories;
const packagesEntity = state => state.entities.packages;
const servicesEntity = state => state.entities.services;

const getCategories = createSelector(
  [schemas, categoriesEntity],
  (entities, categories) => {
    return map(categories, category =>
      denormalize(category.id, Schema.categories, entities),
    );
  },
);

export const SELECTORS = {
  getCategories,
};
