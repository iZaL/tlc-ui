import {schema} from 'normalizr';

const usersSchema = new schema.Entity('users');

usersSchema.define({});

export default (Schema = {
  users: usersSchema,
});
