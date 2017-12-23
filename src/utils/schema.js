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
const driversSchema = new schema.Entity('drivers');
const profileSchema = new schema.Union({
  drivers: driversSchema,
  shippers: shippersSchema,
}, (input) =>  input.schema);


driversSchema.define({
  nationality: countriesSchema,
  residence: countriesSchema,
  truck: trucksSchema,
  visas: [countriesSchema],
  licenses: [countriesSchema],
  blocked_list: [],
  shipper: shippersSchema,
  routes: [routesSchema],
});

usersSchema.define({
  profile:profileSchema,
});

trucksSchema.define({
  make: truckMakesSchema,
  model: truckModelsSchema,
  trailer: trailersSchema,
});

routesSchema.define({
  origin: countriesSchema,
  destination: countriesSchema,
});

countriesSchema.define({
  loading_routes:[routesSchema]
});

export const Schema = {
  users: usersSchema,
  countries: countriesSchema,
  trucks: trucksSchema,
  truck_makes: truckMakesSchema,
  truck_models: truckModelsSchema,
  trailer_makes: trailerMakesSchema,
  trailers: trailersSchema,
  drivers:driversSchema,
  shippers:shippersSchema
};
