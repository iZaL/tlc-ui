import merge from 'lodash/merge';

export function reducer(
  state = {
    users: {},
    countries: {},
    truck_makes: {},
    truck_models: {},
    trucks: {},
    shippers: {},
    trailer_makes: {},
    trailers: {},
    routes: {},
    loads: {},
    shipper_locations: {},
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
