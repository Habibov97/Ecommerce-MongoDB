const Joi = require('joi');

const create = Joi.object({
  list: Joi.array().items(
    Joi.object({
      productId: Joi.string().required(),
      variantId: Joi.string().required(),
      count: Joi.number().min(1).default(1),
    }),
  ),
});

const orderValidation = {
  create,
};

module.exports = orderValidation;
