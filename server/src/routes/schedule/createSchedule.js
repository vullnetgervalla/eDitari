const { Router } = require('express');
const { db } = require('../../db');
const { checkRole } = require('../../middleware/checkRole');

const createScheduleRouter = Router();

createScheduleRouter.post('/', checkRole('create-schedule'), (req, res) => {
    const { schoolid } = req.user;
    const { teachersubjectid, classid, period, day } = req.body;
    db.query('SELECT * from checkDuplicateSchedule($1, $2, $3, $4, $5)', [teachersubjectid, classid, period, day, schoolid], (err, queryRes) => {
        if (err) {
            console.error('Error executing query', err);
            res.sendStatus(500);
            return;
        }
        if(queryRes.rows.length !== 0){
            res.sendStatus(409)
            return;
        }

        db.query('SELECT * from insertSchedule($1, $2, $3, $4)', [teachersubjectid, classid, period, day], (err, queryRes) => {
            if (err) {
                console.error('Error executing query', err);
                res.sendStatus(500);
                return;
            }
            res.send(queryRes.rows);
        });
    })
});



module.exports = { createScheduleRouter };