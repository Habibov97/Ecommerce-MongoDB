const express = require('express');
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const { validationMiddleware } = require('../middlewares/validation.middleware');
const productValidation = require('../validations/product.validation');
const productRouter = express.Router();

productRouter
  .route('/')
  .get(validationMiddleware(productValidation.list, 'query'), productController.list)
  .post(
    authMiddleware,
    roleMiddleware('admin'),
    validationMiddleware(productValidation.create, 'body'),
    productController.create,
  );
productRouter
  .route('/:id')
  .get(() => {})
  .post(authMiddleware, roleMiddleware('admin'), () => {})
  .delete(authMiddleware, roleMiddleware('admin'), () => {});

module.exports = productRouter;
