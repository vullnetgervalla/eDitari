const { Router } = require('express');
require('dotenv').config();
const { getSubjectRouter } = require('./getSubject');
const { createSubjectRouter } = require('./createSubject');
const { deleteSubjectRouter } = require('./deleteSubject');
const { updateSubjectRouter } = require('./updateSubject');

const subjectRouter = Router();

subjectRouter.use('/', createSubjectRouter);
subjectRouter.use('/', getSubjectRouter);
subjectRouter.use('/', deleteSubjectRouter);
subjectRouter.use('/', updateSubjectRouter);

module.exports = { subjectRouter };