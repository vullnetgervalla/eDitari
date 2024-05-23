const { Router } = require('express');
require('dotenv').config();
const { getScheduleRouter } = require('./getSchedule');
const { createScheduleRouter } = require('./createSchedule');

const scheduleRouter = Router();

scheduleRouter.use('/', getScheduleRouter);
scheduleRouter.use('/', createScheduleRouter);

module.exports = { scheduleRouter };