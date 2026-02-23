const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');
const uploadRouter = require('./upload.router');
const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', authMiddleware, userRouter);
router.use('/category', categoryRouter);
router.use('/upload', uploadRouter);

module.exports = router;
