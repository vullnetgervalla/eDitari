const { Router } = require('express');
require('dotenv').config();
const { getSubjectRouter } = require('./getSubject');
const { createSubjectRouter } = require('./createSubject');

const subjectRouter = Router();

subjectRouter.use('/', getSubjectRouter);
subjectRouter.use('/', createSubjectRouter);

module.exports = { subjectRouter };