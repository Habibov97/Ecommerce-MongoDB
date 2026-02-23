const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const imageModel = mongoose.model('Image', imageSchema);

module.exports = imageModel;
