const express = require('express');
const uploadController = require('../controllers/upload.controller');
const multer = require('multer');
const storage = require('../utils/multerDiskStorage.utils');
const uploadRouter = express.Router();

const upload = multer({ storage });

uploadRouter.route('/image').post(upload.single('file'), (req, res) => {
  res.send('image uploaded');
});

module.exports = uploadRouter;
