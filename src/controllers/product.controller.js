const productService = require('../services/product.service');
const list = async (req, res, next) => {
  try {
    const result = await productService.productList(req.validationQuery);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await productService.create(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await productService.update(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await productService.delete(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const productController = {
  list,
  create,
  update,
  remove,
};

module.exports = productController;
