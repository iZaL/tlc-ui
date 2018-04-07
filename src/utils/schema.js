import {schema} from 'normalizr';

const usersSchema = new schema.Entity('users');
const countriesSchema = new schema.Entity('countries');
const trucksSchema = new schema.Entity('trucks');
const truckMakesSchema = new schema.Entity('truck_makes');
const trailerMakesSchema = new schema.Entity('trailer_makes');
const trailersSchema = new schema.Entity('trailers');
const truckModelsSchema = new schema.Entity('truck_models');
const customersSchema = new schema.Entity('customers');
const routesSchema = new schema.Entity('routes');
const loadsSchema = new schema.Entity('loads');
const tripsSchema = new schema.Entity('trips');
const driversSchema = new schema.Entity('drivers');
const customerLocationsSchema = new schema.Entity('customer_locations');
const packagingSchema = new schema.Entity('packaging');
const passesSchema = new schema.Entity('passes');

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
});

customersSchema.define({
  locations: [customerLocationsSchema],
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

passesSchema.define({
  country: countriesSchema,
});

truckMakesSchema.define({
  models: [truckModelsSchema],
});

export const Schema = {
  users: usersSchema,
  countries: countriesSchema,
  trucks: trucksSchema,
  truck_makes: truckMakesSchema,
  trailer_makes: trailerMakesSchema,
  trailers: trailersSchema,
  drivers: driversSchema,
  customers: customersSchema,
  routes: routesSchema,
  loads: loadsSchema,
  trips: tripsSchema,
  packaging: packagingSchema,
  passes: passesSchema,
  customer_locations: customerLocationsSchema,
};
