const { decodeJwtPayload } = require('../utils/jwt.utils');
const userModel = require('../models/user.model');
const AppError = require('../utils/appError');

const authMiddleware = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) throw new AppError('Unauthorized', 401);
  const token = authorization.split(' ')[1];
  if (!token) throw new AppError('Unauthorized', 401);

  const decoded = decodeJwtPayload(token);

  const user = await userModel.findById(decoded.userId);
  if (!user) throw new AppError('User token is invalid!', 401);
  req.user = user;

  next();
};

module.exports = authMiddleware;
