const Joi = require('joi');

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
  limit: Joi.number().min(1).default(10),
  page: Joi.number().min(0).default(0),
});

const create = Joi.object({
  title: Joi.string().min(5).required().trim(),
  slug: Joi.string()
    .min(5)
    .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: Joi.string().min(5).required().trim(),
  price: Joi.number().min(1).required(),
  discount: Joi.number().min(0).default(0),
  discountType: Joi.string().valid('percentage', 'fixed'),
  images: Joi.array().items(Joi.string()).default([]),
  categories: Joi.array().items(Joi.string()).default([]),
});

const productValidation = {
  list,
  create,
};

module.exports = productValidation;
