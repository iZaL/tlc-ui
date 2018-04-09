import {createSelector} from 'reselect';

const entities = state => state.entities;

const countriesSchema = state => state.entities.countries;
const securityPassesSchema = state => state.entities.security_passes;

const getSecurityPasses = createSelector(
  [entities, countriesSchema,securityPassesSchema],
  (schema, countries,passes) => {
    return Object.keys(passes).map(securityPassID => {
      let pass = passes[securityPassID];
      return {
        ...pass,
        country:countries[pass.country]
      }
    });
  },
);

export const SELECTORS = {
  getSecurityPasses
};
