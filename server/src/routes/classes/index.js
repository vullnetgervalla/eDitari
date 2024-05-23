const { Router } = require('express');
require('dotenv').config();
const { getClassRouter } = require('./getClasses');
const { createClassRouter } = require('./createClasses');

const classRouter = Router();

classRouter.use('/', getClassRouter);
classRouter.use('/', createClassRouter);

module.exports = {
    classRouter
};
