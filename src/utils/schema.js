import {schema} from 'normalizr';

const usersSchema = new schema.Entity('users');
// const profileSchema = new schema.Entity('profiles');
const countriesSchema = new schema.Entity('countries');

usersSchema.define({
  profile: {
    nationality: countriesSchema,
    residence: countriesSchema
  }
});

// profileSchema.define({
//   nationality: countriesSchema,
//   residence_country_id: countriesSchema
// });

export const Schema = {
  users: usersSchema,
  countries: countriesSchema,
};
