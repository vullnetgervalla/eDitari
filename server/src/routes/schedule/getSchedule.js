const { Router } = require('express');
const { db } = require('../../db');
const { checkRole } = require('../../middleware/checkRole');

const getScheduleRouter = Router();

getScheduleRouter.get('/', checkRole('list-schedule'), (req, res) => {
    const {schoolid} = req.user;
    db.query('SELECT * from getActiveSchedules($1)', [schoolid], (err, queryRes) => {
        if (err) {
          console.error('Error executing query', err);
          res.sendStatus(500);
          return;
        }
        res.send(queryRes.rows);
      });
});

module.exports = { getScheduleRouter };