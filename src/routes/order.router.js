const { Router } = require('express');
const orderValidation = require('../validations/order.validation');
const orderController = require('../controllers/order.controller');
const { validationMiddleware } = require('../middlewares/validation.middleware');

const orderRouter = Router();

orderRouter.get('/', orderController.listByUser);
orderRouter.post('/', validationMiddleware(orderValidation.create), orderController.create);

module.exports = orderRouter;
