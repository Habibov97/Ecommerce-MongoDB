const productModel = require('../models/product.model');
const productList = async (filter = {}) => {
  let query = productModel.find();

  if (filter.categories) {
    query.in('categories', filter.categories);
  }
  if (filter.minPrice) {
    query.gte('price', filter.minPrice);
  }
  if (filter.maxPrice) {
    query.lte('price', filter.maxPrice);
  }

  const result = await query;
  return result;
};

const create = async (params) => {
  const product = new productModel(params);
  await product.save();
  return product;
};

const update = async (id, params) => {
  const product = await productModel.findByIdAndUpdate(id, params, { new: true });
  if (!product) throw new AppError('Product is not found', 404);

  return product;
};

const remove = async (id) => {
  const product = await productModel.findById(id);
  if (!product) throw new AppError('Product is not found', 404);

  await productModel.findByIdAndDelete(product.id);
  return true;
};

const productService = {
  productList,
  create,
  update,
  remove,
};

module.exports = productService;
