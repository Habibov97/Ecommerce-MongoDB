const jwt = require('jsonwebtoken');
const config = require('../config/index');
const AppError = require('./appError');
const encodeJwtPayload = (payload) => {
  const token = jwt.sign(payload, config.jwt_secret, { expiresIn: '1d' });
  return token;
};

const decodeJwtPayload = (token) => {
  try {
    const decoded = jwt.verify(token, config.jwt_secret);
    return decoded;
  } catch (err) {
    throw new AppError('Invalid or expired token', 401);
  }
};

module.exports = {
  encodeJwtPayload,
  decodeJwtPayload,
};
