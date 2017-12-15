import {schema} from 'normalizr';

const usersSchema = new schema.Entity('users');
const countriesSchema = new schema.Entity('countries');
const trucksSchema = new schema.Entity('trucks');
const truckMakesSchema = new schema.Entity('truck_makes');
const truckModelsSchema = new schema.Entity('truck_models');
const shippersSchema = new schema.Entity('shippers');

usersSchema.define({
  profile: {
    nationality: countriesSchema,
    residence: countriesSchema,
    truck:trucksSchema,
    visas:[countriesSchema],
    licenses:[countriesSchema],
    blocked_list:[],
    shipper:shippersSchema
  },
});

trucksSchema.define({
  make:truckMakesSchema,
  model:truckModelsSchema
});

export const Schema = {
  users: usersSchema,
  countries: countriesSchema,
  trucks: trucksSchema,
  truck_makes:truckMakesSchema,
  truck_models:truckModelsSchema,
  shippers:shippersSchema
};
