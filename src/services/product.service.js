const productModel = require('../models/product.model');
const generateSlug = require('../utils/slug.utils');
const productList = async (filter = {}) => {
  let query = productModel.find();

  if (filter.categories) {
    query = query.where('categories').in(filter.categories);
  }
  if (filter.minPrice) {
    query = query.where('variants.price').gte(filter.minPrice);
  }
  if (filter.maxPrice) {
    query = query.where('variants.price').lte(filter.maxPrice);
  }

  if (filter.color) {
    query = query.where('variants.specs.color').equals(filter.color);
  }

  const limit = filter.limit || 10;
  const page = filter.page || 1;
  query = query.limit(limit).skip(limit * (page - 1));

  query.populate('categories');
  query.populate('variants.images');
  const products = await query;
  const total = await productModel.countDocuments(query.getFilter());

  return {
    products,
    total,
  };
};

const create = async (params) => {
  if (!params.slug) {
    params.slug = generateSlug(params.title);
  }
  const product = new productModel(params);
  await product.save();
  return product;
};

const upsertVariant = async (id, params) => {
  const product = await productModel.findById(id);
  if (!product) throw new AppError('Product is not found', 404);

  product.variants = product.variants || [];

  const { variants } = product;

  const variant = variants.find((variant) => {
    let checkSpec = Object.entries(variant.specs).some(([key, value]) => {
      return params.specs[key] !== value;
    });
    return checkSpec === false;
  });

  params.slug = params.slug || variant?.slug || generateSlug(`${Object.values(params.specs).join('-')}`);

  if (variant) {
    for (let [key, value] of Object.entries(params)) {
      variant[key] = value;
    }
  } else {
    product.variants.push(params);
  }

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
  upsertVariant,
};

module.exports = productService;

// product.specs.filter((item) => {
//   if(item["key"] === Object.entries(variant.specs).find((s) => s))
// });
