const express = require('express');
const categoryRouter = express.Router();
const categoryController = require('../controllers/category.controller');
const { validationMiddleware } = require('../middlewares/validation.middleware');
const authMiddleWare = require('../middlewares/auth.middleware');
const categoryValidation = require('../validations/category.validation');
const roleMiddleware = require('../middlewares/role.middleware');

categoryRouter
  .route('/')
  .get(categoryController.nestedList)
  .post(
    authMiddleWare,
    roleMiddleware('admin'),
    validationMiddleware(categoryValidation.create),
    categoryController.create,
  );

categoryRouter
  .route('/:id')
  .patch(
    authMiddleWare,
    roleMiddleware('admin'),
    validationMiddleware(categoryValidation.update),
    categoryController.updateCategory,
  )
  .delete(authMiddleWare, roleMiddleware('admin'), categoryController.removeCategory);

module.exports = categoryRouter;
