const uploadServices = require('../services/upload.service');
const AppError = require('../utils/appError');

const uploadImage = async (req, res, next) => {
  if (!req.file) return next(new AppError('file is required!'), 400);

  let result = await uploadServices.uploadImage(req.file);
  res.json(result);
};

const uploadController = {
  uploadImage,
};

module.exports = uploadController;
