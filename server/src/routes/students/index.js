const { Router } = require('express');
require('dotenv').config();
const { getStudentDataRouter } = require('./getStudentData');

const studentRouter = Router();

studentRouter.use('/', getStudentDataRouter);

module.exports = { studentRouter };