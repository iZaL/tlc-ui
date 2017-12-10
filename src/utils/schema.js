import {schema} from 'normalizr';

const usersSchema = new schema.Entity('users');

usersSchema.define({});

export const Schema = {
  users: usersSchema,
};
