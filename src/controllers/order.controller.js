const orderService = require('../services/order.service');

const listByUser = async (req, res, next) => {
  try {
    let result = await orderService.listByUser(req.user._id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    let result = await orderService.create(req.user, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const orderController = {
  listByUser,
  create,
};

module.exports = orderController;
