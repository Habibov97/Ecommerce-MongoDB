const AppError = require('../utils/appError');

const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const result = schema?.validate(req.body);
    if (result.error) return next(new AppError(result.error?.details?.[0]?.message, 400));

    next();
  };
};

// result.error?.details?.[0]?.message,

module.exports = { validationMiddleware };
