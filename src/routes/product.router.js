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
  .post(authMiddleware, roleMiddleware('admin'), productController.update)
  .delete(authMiddleware, roleMiddleware('admin'), () => {});
productRouter
  .route('/:id/variant')
  .post(
    authMiddleware,
    roleMiddleware('admin'),
    validationMiddleware(productValidation.upsertVariant, 'body'),
    productController.upsertVariant,
  );

module.exports = productRouter;
