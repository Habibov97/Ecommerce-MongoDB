const userModel = require('../models/user.model');
const imageModel = require('../models/image.model');

const updateProfile = async (id, params) => {
  const user = await userModel.findById(id);
  if (!user) throw new AppError('User is not found', 404);

  if (params.avatar) {
    const image = await imageModel.findById(params.avatar);

    if (!image) throw new AppError('Image is not found', 404);

    user.avatar = image._id;

    delete params.avatar;
  }

  for (let [key, value] of Object.entries(params)) {
    user[key] = value;
  }

  await user.save();

  return user;
};

const userService = {
  updateProfile,
};

module.exports = userService;
