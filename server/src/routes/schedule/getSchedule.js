const { Router } = require('express');
const { db } = require('../../db');
const { checkRole } = require('../../middleware/checkRole');

const getScheduleRouter = Router();



module.exports = { getScheduleRouter };