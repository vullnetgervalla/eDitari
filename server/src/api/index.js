const { Router } = require('express');
const { usersRouter } = require('./users');

const apiRouter = Router();

apiRouter.use('/users', usersRouter);

module.exports = {
  apiRouter,
};
