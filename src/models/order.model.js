const mongoose = require('mongoose');
const { productVariantSchema } = require('./product.model');

const orderSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  variant: productVariantSchema,
});

const orderGroupSchema = new mongoose.Schema(
  {
    list: [orderSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    totalDiscount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const orderGroupModel = mongoose.model('Order', orderGroupSchema);

module.exports = orderGroupModel;
