const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');
const uploadRouter = require('./upload.router');
const productRouter = require('./product.router');
const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', authMiddleware, userRouter);
router.use('/category', categoryRouter);
router.use('/upload', uploadRouter);
router.use('/product', productRouter);
router.use('/order', authMiddleware, require('./order.router'));

module.exports = router;
