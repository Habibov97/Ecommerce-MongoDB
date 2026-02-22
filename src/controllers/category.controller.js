const categoryService = require('../services/category.service');

const create = async (req, res, next) => {
  try {
    const body = req.body;
    const result = await categoryService.create(body);
    res.json(result);
  } catch (error) {
    next(err);
  }
};

const nestedList = async (req, res, next) => {
  try {
    let result = await categoryService.nestedList();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const result = await categoryService.update(id, body);
    res.status(200).json({
      message: 'category has been updated..',
      result,
    });
  } catch (error) {
    next(error);
  }
};

const removeCategory = async (req, res, next) => {
  const { id } = req.params;

  try {
    await categoryService.removeCategory(id);

    res.status(200).json({ message: 'category has been deleted..' });
  } catch (error) {
    next(error);
  }
};

const categoryController = {
  create,
  nestedList,
  removeCategory,
  updateCategory,
};

module.exports = categoryController;
