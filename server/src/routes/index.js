const { Router } = require('express');
require('dotenv').config();
const { userRouter } = require('./users');
const { authRouter } = require('./auth');
const { classRouter } = require('./classes');

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/classes', classRouter);

module.exports = {
  apiRouter,
};
