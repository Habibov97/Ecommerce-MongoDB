const Joi = require('joi');

const baseSchema = {
  name: Joi.string().trim(),
  slug: Joi.string().pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  order: Joi.number().default(0),
  parentId: Joi.string().alphanum(),
};

const create = Joi.object(baseSchema).fork(['name'], (schema) => schema.required());

const update = Joi.object(baseSchema);

const categoryValidation = {
  create,
  update,
};

module.exports = categoryValidation;
