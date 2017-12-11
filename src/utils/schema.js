import {schema} from 'normalizr';

const usersSchema = new schema.Entity('users');
const countriesSchema = new schema.Entity('countries');

usersSchema.define({});

export const Schema = {
  users: usersSchema,
  countries: countriesSchema,
};
