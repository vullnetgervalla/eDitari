const { Router } = require('express');
const { db } = require('../../db');
const { checkRole } = require('../../middleware/checkRole');
const { authenticateToken } = require('../../middleware/authenticateToken');
 
const getNotificationsRouter = Router();

getNotificationsRouter.get('/', authenticateToken, (req, res) => {
    const { schoolid } = req.user;
    db.query('SELECT * FROM getNotificationsDetails($1)', [schoolid],(err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal server error');
        }
        res.send(results.rows)
    });
});

module.exports = { getNotificationsRouter };