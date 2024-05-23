const { Router } = require('express');
require('dotenv').config();
const { userRouter } = require('./users');
const { authRouter } = require('./auth');
const { classRouter } = require('./classes');
const { subjectRouter } = require('./subjects');
const { notificationsRouter } = require('./notifications');
const { scheduleRouter } = require('./schedule');

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/classes', classRouter);
apiRouter.use('/subjects', subjectRouter);
apiRouter.use('/notifications', notificationsRouter);
apiRouter.use('/schedule', scheduleRouter);

module.exports = {
  apiRouter,
};
