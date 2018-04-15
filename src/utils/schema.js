import {schema} from 'normalizr';

const usersSchema = new schema.Entity('users');
const countriesSchema = new schema.Entity('countries');
const trucksSchema = new schema.Entity('trucks');
const truckMakesSchema = new schema.Entity('truck_makes');
const trailerMakesSchema = new schema.Entity('trailer_makes');
const trailerTypesSchema = new schema.Entity('trailer_types');
const trailersSchema = new schema.Entity('trailers');
const truckModelsSchema = new schema.Entity('truck_models');
const customersSchema = new schema.Entity('customers');
const routesSchema = new schema.Entity('routes');
const loadsSchema = new schema.Entity('loads');
const tripsSchema = new schema.Entity('trips');
const driversSchema = new schema.Entity('drivers');
const customerLocationsSchema = new schema.Entity('customer_locations');
const packagingSchema = new schema.Entity('packaging');
const securityPassesSchema = new schema.Entity('security_passes');

const profileSchema = new schema.Union(
  {
    drivers: driversSchema,
    customers: customersSchema,
  },
  input => input.schema,
);

driversSchema.define({
  nationalities: [{country: countriesSchema}],
  residencies: [{country: countriesSchema}],
  licenses: [{country: countriesSchema}],
  visas: [{country: countriesSchema}],
  truck: trucksSchema,
  customer: customersSchema,
  routes: [routesSchema],
  loads: [loadsSchema],
  upcoming_trips: [tripsSchema],
  security_passes: [{security_pass: securityPassesSchema}],
  user:usersSchema
});

customersSchema.define({
  locations: [customerLocationsSchema],
  blocked_drivers: [driversSchema],
});

customerLocationsSchema.define({
  country: countriesSchema,
});

usersSchema.define({
  profile: profileSchema,
});

trucksSchema.define({
  model: truckModelsSchema,
  trailer: trailersSchema,
  registration_country: countriesSchema,
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
  customer: customersSchema,
});

tripsSchema.define({
  load: loadsSchema,
  driver: driversSchema,
});

securityPassesSchema.define({
  country: countriesSchema,
});

truckMakesSchema.define({
  models: [truckModelsSchema],
});

trailersSchema.define({
  type: trailerTypesSchema,
  make: trailerMakesSchema,
});

export const Schema = {
  users: usersSchema,
  countries: countriesSchema,
  trucks: trucksSchema,
  truck_makes: truckMakesSchema,
  trailer_makes: trailerMakesSchema,
  trailer_types: trailerTypesSchema,
  trailers: trailersSchema,
  drivers: driversSchema,
  customers: customersSchema,
  routes: routesSchema,
  loads: loadsSchema,
  trips: tripsSchema,
  packaging: packagingSchema,
  security_passes: securityPassesSchema,
  customer_locations: customerLocationsSchema,
};
