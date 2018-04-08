import merge from 'lodash/merge';

export function reducer(
  state = {
    users: {},
    countries: {},
    truck_makes: {},
    truck_models: {},
    trucks: {},
    customers: {},
    trailer_makes: {},
    trailer_types: {},
    trailers: {},
    routes: {},
    loads: {},
    customer_locations: {},
    trips: {},
    packaging: {},
    passes: {},
  },
  action = {},
) {
  if (action.entities) {
    return merge({}, state, action.entities);
  }

  return state;
}
