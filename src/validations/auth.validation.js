const Joi = require('joi');
const { isValidPhoneNumber } = require('libphonenumber-js');

const register = Joi.object({
  fullName: Joi.string().required().trim().min(3).max(30),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } }),
  password: Joi.string().required().min(8).pattern(/[a-z]/).pattern(/[A-Z]/).pattern(/[0-9]/),
  phone: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!isValidPhoneNumber(value)) {
        return helpers.message('Phone number is not valid');
      }
    }),
});

const logIn = Joi.object({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } }),
  password: Joi.string().required(),

  // .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')),
});

const authValidation = {
  register,
  logIn,
};

module.exports = authValidation;
