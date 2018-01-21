import {schema} from 'normalizr';

const usersSchema = new schema.Entity('users');
const countriesSchema = new schema.Entity('countries');
const trucksSchema = new schema.Entity('trucks');
const truckMakesSchema = new schema.Entity('truck_makes');
const trailerMakesSchema = new schema.Entity('trailer_makes');
const trailersSchema = new schema.Entity('trailers');
const truckModelsSchema = new schema.Entity('truck_models');
const shippersSchema = new schema.Entity('shippers');
const routesSchema = new schema.Entity('routes');
const loadsSchema = new schema.Entity('loads');
const tripsSchema = new schema.Entity('trips');
const driversSchema = new schema.Entity('drivers');
const shipperLocationsSchema = new schema.Entity('shipper_locations');

const profileSchema = new schema.Union(
  {
    drivers: driversSchema,
    shippers: shippersSchema,
  },
  input => input.schema,
);

driversSchema.define({
  nationality: countriesSchema,
  residence: countriesSchema,
  truck: trucksSchema,
  licenses: [{country: countriesSchema}],
  visas: [{country: countriesSchema}],
  shipper: shippersSchema,
  routes: [routesSchema],
  loads: [loadsSchema],
  upcoming_trips:[tripsSchema]
});

shippersSchema.define({
  locations: [shipperLocationsSchema],
});

shipperLocationsSchema.define({
  country: countriesSchema,
});

usersSchema.define({
  profile: profileSchema,
});

trucksSchema.define({
  make: truckMakesSchema,
  model: truckModelsSchema,
  trailer: trailersSchema,
});

routesSchema.define({
  origin: countriesSchema,
  destination: countriesSchema,
  transits: [countriesSchema],
});

countriesSchema.define({
  loading_routes: [routesSchema],
});

loadsSchema.define({
  origin: {
    country: countriesSchema,
  },
  destination: {
    country: countriesSchema,
  },
  trailer: trailersSchema,
});

tripsSchema.define({
  load:loadsSchema,
  driver:driversSchema
});

export const Schema = {
  users: usersSchema,
  countries: countriesSchema,
  trucks: trucksSchema,
  truck_makes: truckMakesSchema,
  truck_models: truckModelsSchema,
  trailer_makes: trailerMakesSchema,
  trailers: trailersSchema,
  drivers: driversSchema,
  shippers: shippersSchema,
  routes: routesSchema,
  loads: loadsSchema,
  trips: tripsSchema,
};
