import {schema} from 'normalizr';

const categoriesSchema = new schema.Entity('categories');
const packagesSchema = new schema.Entity('packages');
const servicesSchema = new schema.Entity('services');

categoriesSchema.define({
  packages: [packagesSchema],
});

packagesSchema.define({
  services: [servicesSchema],
  category: categoriesSchema,
});

servicesSchema.define({
  package: packagesSchema,
});

export default (Schema = {
  categories: categoriesSchema,
});
