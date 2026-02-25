const AppError = require('../utils/appError');

const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) return next();

    next(new AppError('Forbidden', 403));
  };
};

module.exports = roleMiddleware;
