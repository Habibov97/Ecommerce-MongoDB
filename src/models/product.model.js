const mongoose = require('mongoose');

const productSpecSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  values: [
    {
      key: {
        type: String,
        required: true,
        trim: true,
      },
      value: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
});

const productVariantSchema = new mongoose.Schema({
  specs: {
    type: Map,
    of: String,
    default: {},
    required: true,
  },
  images: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Image',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    default: 'percentage',
  },
  slug: {
    type: String,
    required: true,
    trim: true,
  },
});

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    categories: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Category',
      default: [],
    },
    specs: [productSpecSchema],
    variants: [productVariantSchema],
  },
  { timestamps: true },
);

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;
