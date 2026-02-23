const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const uploadFolderPath = path.join(__dirname, '../../uploads');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolderPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuidv4();
    const mimetype = file.mimetype.split('/')[1];

    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + mimetype);
  },
});

module.exports = storage;
