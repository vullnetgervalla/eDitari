const { Router } = require('express');
require('dotenv').config();
const { getUserRouter } = require('./getUser');
const { createUserRouter } = require('./createUser');
const { updateUserRouter } = require('./updateUser');
const { deleteUserRouter } = require('./deleteUser');
const { createRoleRouter } = require('./createRole');
const { getRoleRouter } = require('./getRole');
const { getCountsRouter } = require('./counts');

const userRouter = Router();

userRouter.use('/', createUserRouter);
userRouter.use('/', updateUserRouter);
userRouter.use('/', deleteUserRouter);
userRouter.use('/', createRoleRouter);
userRouter.use('/', getRoleRouter);
userRouter.use('/', getCountsRouter);
userRouter.use('/', getUserRouter);

module.exports = {
  userRouter,
};
