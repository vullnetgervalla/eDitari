const { Router } = require('express');
require('dotenv').config();
const { getNotificationsRouter } = require('./getNotifications');

const notificationsRouter = Router();

notificationsRouter.use('/', getNotificationsRouter);

module.exports = {
    notificationsRouter
};
