const categoryModel = require('../models/category.model');
const AppError = require('../utils/appError');
const create = async (params) => {
  const category = new categoryModel(params);
  await category.save();

  return category;
};

const nestedList = async () => {
  let list = await categoryModel.find().sort({ order: 1 }).lean();
  let result = list.filter((item) => !item.parentId).map((item) => subCategories(list, item));
  return result;
};

const update = async (id, params) => {
  const category = await categoryModel.findByIdAndUpdate(id, params, { new: true });
  if (!category) throw new AppError('Category is not found!', 404);

  return category;
  // 2.case
  // const category = await categoryModel.findById(id);
  // if (!category) throw new AppError('Category is not found!', 404);
  // await categoryModel.updateOne({ _id: id }, { params });

  // return category;

  // 3.case
  // const category = await categoryModel.findOne({ _id: id });

  // for (let [key, value] of Object.entries(params)) {
  //   category[key] = value;
  // }

  // await category.save();
  // return category;
};

const removeCategory = async (id) => {
  let list = await categoryModel.find().lean();
  const category = await categoryModel.findById(id).lean();
  if (!category) throw new AppError('Category is not found!', 404);
  const subCategoryTree = subCategories(list, category);

  const idsToDelete = collectIds(subCategoryTree);

  await categoryModel.deleteMany({ _id: { $in: idsToDelete } });
  return true;
};

//UTILS
const subCategories = (list, category) => {
  const children = list
    .filter((item) => item.parentId?.toString() === category._id.toString())
    .map((item) => subCategories(list, item));

  return {
    ...category,
    children: children.length ? children : undefined,
  };
};

const collectIds = (category) => {
  let ids = [category._id.toString()];

  if (category.children) {
    for (let child of category.children) {
      ids = [...ids, ...collectIds(child)];
    }
  }
  return ids;
};

const categoryService = {
  nestedList,
  create,
  update,
  removeCategory,
};

module.exports = categoryService;
