const { Router } = require('express');
require('dotenv').config();
const { loginRouter } = require('./login');
const { refreshRouter } = require('./refreshToken');
const { logoutRouter } = require('./logout');

const authRouter = Router();

authRouter.use('/login', loginRouter);
authRouter.use('/refresh-token', refreshRouter)
authRouter.use('/logout', logoutRouter);

module.exports = {
    authRouter
};
