const { Router } = require('express');
require('dotenv').config();
const { userRouter } = require('./users');
const { authRouter } = require('./auth');
const { classRouter } = require('./classes');
const { notificationsRouter } = require('./notifications');

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/classes', classRouter);
apiRouter.use('/notifications', notificationsRouter);

module.exports = {
  apiRouter,
};
