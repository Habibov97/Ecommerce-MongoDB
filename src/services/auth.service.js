const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');
const AppError = require('../utils/appError');
const { encodeJwtPayload } = require('../utils/jwt.utils');
const register = async (params) => {
  const existsUser = await userModel.findOne({ email: params.email });
  if (existsUser) throw new AppError('User has already exists', 400);

  const user = userModel(params);
  await user.save();
  return user;
};

const logIn = async (params) => {
  const user = await userModel.findOne({ email: params.email }).select('+password');
  if (!user) throw new AppError('email or password is incorrect!', 400);
  const password = await bcrypt.compare(params.password, user.password);
  if (!password) throw new AppError('email or password is incorrect!', 400);

  let token = encodeJwtPayload({ userId: user._id });

  user.password = undefined;
  return { token, user };
};

const authService = {
  logIn,
  register,
};

module.exports = authService;
