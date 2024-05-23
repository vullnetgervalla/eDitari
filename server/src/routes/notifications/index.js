const { Router } = require('express');
require('dotenv').config();
const { getNotificationsRouter } = require('./getNotification');
const { createNotificationsRouter } = require('./createNotification');

const notificationsRouter = Router();

notificationsRouter.use('/', getNotificationsRouter);
notificationsRouter.use('/', createNotificationsRouter);

module.exports = {
    notificationsRouter
};
