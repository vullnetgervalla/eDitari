const { Router } = require('express');
const { db } = require('../../db');
const { isAdminToken } = require('../../middleware/isAdminToken');
const { isAdminTeacherToken } = require('../../middleware/isAdminTeacherToken');
const { authenticateToken } = require('../../middleware/authenticateToken');

const getCountsRouter = Router();

getCountsRouter.get('/totalUsers', isAdminToken, (req, res) => {
    const { user, schoolid } = req.user;
    let role = req.query.role;
    role = role.substring(1, role.length - 1).split(',').map(str => str === '1');
    db.query('SELECT * from getTotalNumberOfUsers($1, $2)', [schoolid, role], (err, queryRes) => {
        if (err) {
            console.error('Error executing query', err);
            res.sendStatus(500);
            return;
        }
        res.send(queryRes.rows);
    });
});

getCountsRouter.get('/totalClasses', isAdminToken, (req, res) => {
    const { schoolid } = req.user;
    db.query('SELECT * from getNumOfClasses($1)', [schoolid], (err, queryRes) => {
        if (err) {
            console.error('Error executing query', err);
            res.sendStatus(500);
            return;
        }
        res.send(queryRes.rows);
    });
});

module.exports = { getCountsRouter };