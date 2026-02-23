const Joi = require('joi');
const { isValidPhoneNumber } = require('libphonenumber-js');

const update = Joi.object({
  fullName: Joi.string().trim().min(3).max(30),
  phone: Joi.string().custom((value, helpers) => {
    if (!isValidPhoneNumber(value)) {
      return helpers.message('Phone number is not valid');
    }
  }),
  avatar: Joi.string().trim(),
});

const userValidation = {
  update,
};

module.exports = userValidation;
