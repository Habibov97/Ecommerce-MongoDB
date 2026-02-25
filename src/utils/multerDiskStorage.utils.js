const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const AppError = require('./appError');

const uploadFolderPath = path.join(__dirname, '../../uploads');
const allowedTypes = ['image/jpeg', 'image/webp', 'image/png', 'image/gif'];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolderPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${uuidv4()}-${Date.now()}`;
    const extention = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extention);
  },
});

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) return cb(null, true);
  else return cb(new AppError('Image must be with extension JPEG, PNG or WEBP', 400), false);
};

module.exports = { storage, fileFilter };
