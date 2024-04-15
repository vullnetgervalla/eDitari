const { Router } = require('express');
require('dotenv').config();
const { userRouter } = require('./users');
const { authRouter } = require('./auth');

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);

module.exports = {
  apiRouter,
};
