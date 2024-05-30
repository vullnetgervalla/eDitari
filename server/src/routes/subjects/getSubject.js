const { Router } = require('express');
const { db } = require('../../db');
const { checkRole } = require('../../middleware/checkRole');

const getSubjectRouter = Router();

getSubjectRouter.get('/', checkRole('list-subject'), (req, res) => {
    const { schoolid } = req.user;
    db.query('SELECT * from getSubjects($1)', [schoolid], (err, queryRes) => {
        if (err) {
            console.error('Error executing query', err);
            res.sendStatus(500);
            return;
        }
        res.send(queryRes.rows);
    });
});

getSubjectRouter.get('/teacherSubjects', checkRole('list-subject'), (req, res) => {
    const { schoolid } = req.user;
    db.query('SELECT * from getTeacherSubjects($1)', [schoolid], (err, queryRes) => {
        if (err) {
            console.error('Error executing query', err);
            res.sendStatus(500);
            return;
        }
        res.send(queryRes.rows);
    });
});

getSubjectRouter.get('/tacherSubjectFormatted', checkRole('list-subject'), (req, res) => {
    const { schoolid } = req.user;
    db.query('SELECT * from getClientTeacherSubject($1)', [schoolid], (err, queryRes) => {
        if (err) {
            console.error('Error executing query', err);
            res.sendStatus(500);
            return;
        }
        res.send(queryRes.rows);
    });
});

getSubjectRouter.get('/:id', checkRole('subject'), (req, res) => {
    const { id } = req.params;
    const user = req.user;
    
    const handleQueryResult = (err, queryRes) => {
        if (err) {
            console.error('Error executing query', err);
            res.sendStatus(500);
            return;
        }
        if(queryRes.rows.length === 0) {
            res.sendStatus(403);
            return;
        }
        db.query('SELECT * from getTeacherSubjectInfo($1)', [id], (err, queryRes) => {
            if (err) {
                console.error('Error executing query', err);
                res.sendStatus(500);
                return;
            }
            res.send(queryRes.rows[0]);
            return
        });
    }

    if(user.userType === 'STUDENT') {
        db.query(`select * from schedule
        join class on schedule.classid = class.id
        join student on class.id = student.classid
        where schedule.id = $1
        and student.id = $2;`, [id, user.userid], handleQueryResult);
    }
    else if (user.userType === 'TEACHER') {
        db.query(`select * from schedule
        join teachersubject on schedule.teachersubjectid = teachersubject.id
        where schedule.id = $1
        and teacherid = $2;`, [id, user.userid], handleQueryResult);
    }
});

module.exports = { getSubjectRouter };