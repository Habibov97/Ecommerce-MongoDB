const express = require('express');
const userController = require('../controllers/user.controller');
const { validationMiddleware } = require('../middlewares/validation.middleware');
const userValidation = require('../validations/user.validation');
const userRouter = express.Router();

userRouter
  .route('/profile')
  .get(userController.myProfile)
  .post(validationMiddleware(userValidation.update), userController.updateProfile);

module.exports = userRouter;
