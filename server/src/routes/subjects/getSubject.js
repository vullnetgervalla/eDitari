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
        console.log(queryRes.rows);
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

getSubjectRouter.get('/number', checkRole(null, 'STUDENT'), (req, res) => {
  const { userid } = req.user;
  db.query('SELECT * from getNumberOfStudentSubjects($1)', [userid], (err, queryRes) => {
    if(err) {
        console.error('Error executing query', err);
        res.sendStatus(500);
        return;
    }
    res.send(queryRes.rows);
  })
})

getSubjectRouter.get('/:id', checkRole('subject'), (req, res) => {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
        res.status(400).send('Invalid id');
        return;
    }

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
        db.query(`select * from studentScheduleAccess($1, $2)`, [id, user.userid], handleQueryResult);
    }
    else if (user.userType === 'TEACHER') {
        db.query(`select * from teacherScheduleAccess($1, $2)`, [id, user.userid], handleQueryResult);
    }
});

module.exports = { getSubjectRouter };