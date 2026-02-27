const Joi = require('joi');
const pageValidation = require('./pagination.validation');
const list = Joi.object({
  categories: Joi.string()
    .custom((value, helpers) => {
      let check = /^([0-9a-fA-F]{24})(,\s*[0-9a-fA-F]{24})*$/.test(value);
      if (!check) return helpers.message('Category ids are not valid');
      let categories = value
        ?.split(',')
        .map((item) => item?.trim())
        .filter((item) => item);

      return categories;
    })
    .message('Category ids are not valid'),
  // .required(),
  minPrice: Joi.number().min(1),
  maxPrice: Joi.number()
    .min(1)
    .when('minPrice', { is: Joi.exist(), then: Joi.number().greater(Joi.ref('minPrice')) }),
  color: Joi.string(),
}).concat(pageValidation);

const create = Joi.object({
  title: Joi.string().min(5).required().trim(),
  slug: Joi.string()
    .min(5)
    .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: Joi.string().min(5).required().trim(),
  categories: Joi.array().items(Joi.string()).default([]),
  specs: Joi.array()
    .items(
      Joi.object({
        key: Joi.string().trim().required(),
        name: Joi.string().trim().required(),
        values: Joi.array().items(Joi.object({ key: Joi.string().required(), value: Joi.string().required() })),
      }),
    )
    .default([]),
});

const upsertVariant = Joi.object({
  specs: Joi.object().pattern(Joi.string().required(), Joi.string().required()).required().default({}),
  slug: Joi.string()
    .min(5)
    .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  price: Joi.number().min(1).required(),
  stock: Joi.number().min(0).default(0),
  discount: Joi.number().min(0).default(0),
  discountType: Joi.string().valid('percentage', 'fixed'),
  images: Joi.array().items(Joi.string()).default([]),
});

const productValidation = {
  list,
  create,
  upsertVariant,
};

module.exports = productValidation;
