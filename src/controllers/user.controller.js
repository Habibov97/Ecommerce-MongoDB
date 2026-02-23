const userModel = require('../models/user.model');
const userService = require('../services/user.service');

const myProfile = async (req, res) => {
  const user = await userModel.findById(req.user._id).populate('avatar');
  if (!user) throw new AppError('User is not found', 404);

  res.status(200).json({ status: 'success', user });
};

const updateProfile = async (req, res, next) => {
  const body = req.body;

  try {
    let result = await userService.updateProfile(req.user._id, body);
    res.json({ message: 'profile has been updated', result });
  } catch (error) {
    next(error);
  }
};

const userController = {
  updateProfile,
  myProfile,
};

module.exports = userController;
