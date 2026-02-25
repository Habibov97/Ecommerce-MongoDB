const AppError = require('../utils/appError');

const validationMiddleware = (schema, source = 'body') => {
  return (req, res, next) => {
    const payload = source === 'body' ? req.body : req.query;

    const validation = schema?.validate(payload);

    if (validation.error) return next(new AppError(validation.error?.details?.[0]?.message, 400));

    if (source === 'body') {
      req.body = validation.value;
    } else {
      req.validationQuery = validation.value;
    }

    next();
  };
};

// result.error?.details?.[0]?.message,

module.exports = { validationMiddleware };
