const express = require('express');
const uploadController = require('../controllers/upload.controller');
const multer = require('multer');
const { storage, fileFilter } = require('../utils/multerDiskStorage.utils');
const uploadRouter = express.Router();

const upload = multer({ storage, fileFilter });

uploadRouter.route('/image').post(upload.single('image'), uploadController.uploadImage);

module.exports = uploadRouter;
