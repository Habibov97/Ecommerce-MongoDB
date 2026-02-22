const express = require('express');
const authController = require('../controllers/auth.controller');
const { validationMiddleware } = require('../middlewares/validation.middleware');
const authValidation = require('../validations/auth.validation');
const authRouter = express.Router();

authRouter.route('/register').post(validationMiddleware(authValidation.register), authController.register);
authRouter.route('/login').post(validationMiddleware(authValidation.logIn), authController.logIn);

module.exports = authRouter;
