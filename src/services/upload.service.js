const imageModel = require('../models/image.model');

const uploadImage = async (file) => {
  let filename = file.filename;
  let image = new imageModel({
    url: `/uploads/${filename}`,
  });
  await image.save();
  return image;
};

const uploadServices = {
  uploadImage,
};

module.exports = uploadServices;
