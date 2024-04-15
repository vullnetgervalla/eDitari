const { Router } = require('express');
require('dotenv').config();
const { loginRouter } = require('./login');
const { refreshRouter } = require('./refreshToken');

const authRouter = Router();

authRouter.use('/login', loginRouter);
authRouter.use('/refresh-token', refreshRouter)

module.exports = {
    authRouter
};
