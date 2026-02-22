const myProfile = (req, res) => {
  res.status(200).json({ status: 'success', user: req.user });
};

const userController = {
  myProfile,
};

module.exports = userController;
