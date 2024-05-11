const { Router } = require('express');
require('dotenv').config();
const { getUserRouter } = require('./getUser');
const { createUserRouter } = require('./createUser');
const { updateUserRouter } = require('./updateUser');
const { deleteUserRouter } = require('./deleteUser');

const userRouter = Router();

userRouter.use('/', getUserRouter);
userRouter.use('/', createUserRouter);
userRouter.use('/', updateUserRouter);
userRouter.use('/', deleteUserRouter);

module.exports = {
	userRouter,
};
