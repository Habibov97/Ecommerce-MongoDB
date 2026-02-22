const authService = require('../services/auth.service');
const AppError = require('../utils/appError');

const register = async (req, res) => {
  const body = req.body;
  const result = await authService.register(body);
  res.status(200).json({ status: 'success', message: 'user registered successfully', result });
};

const logIn = async (req, res) => {
  const body = req.body;
  const result = await authService.logIn(body);
  res.status(200).json({ status: 'success', message: 'user logged in', result });
};

const authController = {
  logIn,
  register,
};

module.exports = authController;
