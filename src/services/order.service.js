const orderGroupModel = require('../models/order.model');
const { productModel } = require('../models/product.model');

const listByUser = async (id) => {
  const list = await orderGroupModel.find({ user: id }).sort({ createdAt: -1 }).populate('list.product');
  return list;
};

const createdOrder = async (user, params) => {
  let productIds = params.list.map((item) => item.productId);
  const products = await productModel.find({ _id: { $in: productIds } });

  const ids = params.list.map((item) => item.productId);
  const uniqueIds = [...new Set(ids)];
  if (uniqueIds.length !== ids.length) {
    throw new AppError('Duplicate product in order list', 400);
  }

  if (products.length !== params.list.length) throw new AppError('Product is not found', 404);

  let totalPrice = 0;
  let totalDiscount = 0;

  let orders = params.list.map((item) => {
    let product = products.find((product) => product.id.toString() === item.productId);
    const variant = product.variants.find((variant) => variant.id.toString() === item.variantId);

    if (!variant) throw new AppError('Variant is not found', 404);

    if (variant.stock < item.count) throw new AppError(`${variant.slug} is out of stock`, 400);

    variant.stock -= item.count;

    let productPrice = variant.price * item.count;
    totalPrice += productPrice;

    //percentage
    totalDiscount += Math.floor((productPrice * variant.discount) / 100);

    return {
      product: product._id,
      price: variant.price,
      count: item.count,
      variant,
    };
  });

  await Promise.all(...products.map((product) => product.save()));

  let payAmount = totalPrice - totalDiscount;
  if (user.balance < payAmount) throw new AppError('Insufficent balance', 400);

  let orderGroup = new orderGroupModel({
    list: orders,
    user: user._id,
    totalPrice: totalPrice,
    totalDiscount: totalDiscount,
  });

  await orderGroup.save();
  await userModel.updateOne({ _id: user._id }, { $inc: { balance: -payAmount } });

  return orderGroup;
};

const orderService = {
  listByUser,
  createdOrder,
};

module.exports = orderService;
