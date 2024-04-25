const { Router } = require('express');
require('dotenv').config();
const { getClassRouter } = require('./getClasses');

const classRouter = Router();

classRouter.use('/', getClassRouter);

module.exports = {
    classRouter
};
