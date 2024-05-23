const { Router } = require('express');
const { db } = require('../../db');
const { checkRole } = require('../../middleware/checkRole');

const createClassRouter = Router();

createClassRouter.post('/', checkRole('create-class'), (req, res) => {
    const { schoolid } = req.user;
    const { classname, classlevel, classroom, yearid, teacherid } = req.body;
    db.query('SELECT * from createClass($1, $2, $3, $4, $5, $6)', [classname, classlevel, classroom, yearid, teacherid, schoolid], (err, queryRes) => {
        if (err) {
            console.error('Error executing query', err);
            res.sendStatus(500);
            return;
        }

        res.send(queryRes.rows);
    });
});

createClassRouter.post('/year', checkRole(null, 'ADMIN'), (req, res) => {
    const { year, startdate, enddate, isactive } = req.body;
    db.query('SELECT * from createYear($1, $2, $3, $4)', [year, startdate, enddate, isactive], (err, queryRes) => {
        if (err) {
            console.error('Error executing query', err);
            res.sendStatus(500);
            return;
        }

        res.send(queryRes.rows);
    });
});


module.exports = { createClassRouter };