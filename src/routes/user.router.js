const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const userRouter = express.Router();

userRouter.route('/myprofile').get(authMiddleware, userController.myProfile);

module.exports = userRouter;
