const { productModel } = require('../models/product.model');
const generateSlug = require('../utils/slug.utils');
const AppError = require('../utils/appError');

const productList = async (filter = {}) => {
  let query = productModel.find();

  if (filter.categories) {
    query = query.where('categories').in(filter.categories);
  }

  if (filter.search) {
    query = query.and([
      {
        $or: [
          { title: { $regex: filter.search, $options: 'i' } },
          { description: { $regex: filter.search, $options: 'i' } },
        ],
      },
    ]);
  }

  for (let [key, value] of Object.entries(filter)) {
    if (['categories', 'page', 'limit', 'search'].includes(key)) continue;
    if (value[0] === '[') {
      let [min, max] = value
        .slice(1, -1)
        .split(',')
        .map((item) => +item.trim());

      if (min) query = query.where(`variants.${key}`).gte(min);
      if (max) query = query.where(`variants.${key}`).lte(max);
    } else if (value[0] === '<') {
      query = query.where(`variants.${key}`).lte(value.slice(1));
    } else if (value[0] === '>') {
      query = query.where(`variants.${key}`).gte(value.slice(1));
    } else if (value.includes(',')) {
      query = query.where(`variants.${key}`).in(value.split(',').map((item) => item.trim()));
    } else {
      query = query.where(`variants.${key}`).equals(value);
    }
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

  for (let [key, value] of Object.entries(params.specs)) {
    let productSpec = product.specs.find((spec) => spec.key === key);
    if (!productSpec) throw new AppError(`${key} speciality is not exists in product`, 404);

    let productSpecItem = productSpec.values.find((item) => item.key === value);
    if (!productSpecItem) throw new AppError(`${value} is not found in ${key} speciality`, 404);
  }

  product.variants = product.variants || [];
  const { variants } = product;

  const variant = variants.find((variant) => {
    let checkSpec = Object.entries(Object.fromEntries(variant.specs)).every(([key, value]) => {
      return params.specs[key] === value;
    });
    return checkSpec;
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
