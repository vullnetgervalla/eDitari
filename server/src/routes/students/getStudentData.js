const { Router } = require('express');
const { db } = require('../../db');
const { checkRole } = require('../../middleware/checkRole');

const getStudentDataRouter = Router();

getStudentDataRouter.get('/attendance', checkRole(null, 'STUDENT'), (req, res) => {
    const { userid } = req.user;
    db.query('SELECT * FROM getStudentAttendance($1)', [userid], (err, queryRes) => {
        if (err) {
            console.error('Error executing query', err);
            res.sendStatus(500);
            return;
        }
        res.send(queryRes.rows);
    })
})

getStudentDataRouter.get('/gpa', checkRole(null, 'STUDENT'), (req, res) => {
    const { userid } = req.user;
    db.query('SELECT * FROM getStudentGPA($1)', [userid], (err, queryRes) => {
        if (err) {
            console.error('Error executing query', err);
            res.sendStatus(500);
            return;
        }
        res.send(queryRes.rows);
    })
})

getStudentDataRouter.get('/final-grades', checkRole(null, 'STUDENT'), (req, res) => {
    const { userid } = req.user;
    db.query('SELECT * FROM getFinalStudentGrades($1)', [userid], (err, queryRes) => {
        if (err) {
            console.error('Error executing query', err);
            res.sendStatus(500);
            return;
        }
        res.send(queryRes.rows);
    })
})

getStudentDataRouter.get('/all-grades', checkRole(null, 'STUDENT'), (req, res) => {
    const { userid } = req.user;
    db.query('SELECT * FROM getAllStudentGrades($1)', [userid], (err, queryRes) => {
        if (err) {
            console.error('Error executing query', err);
            res.sendStatus(500);
            return;
        }
        res.send(queryRes.rows);
    })
})

getStudentDataRouter.get('/subjects', checkRole(null, 'STUDENT'), (req, res) => {
    const { userid, schoolid } = req.user;
    db.query('SELECT * FROM getStudentSubjectsSchedule($1, $2)', [userid, schoolid], (err, queryRes) => {
        if (err) {
            console.error('Error executing query', err);
            res.sendStatus(500);
            return;
        }
        res.send(queryRes.rows);
    })
});

getStudentDataRouter.get('/subject-grades', checkRole(null, 'STUDENT'), (req, res) => {
    const { userid } = req.user;
    const id = req.query.id;
    console.log(userid);
    db.query('SELECT * FROM getStudentSubjectGrades($1, $2)', [userid, id], (err, queryRes) => {
        if (err) {
            console.error('Error executing query', err);
            res.sendStatus(500);
            return;
        }
        res.send(queryRes.rows);
    })
})

getStudentDataRouter.get('/:id', checkRole('subject'), (req, res) => {
    const { id } = req.params;
    db.query('SELECT * from getStudentSubjectInfo($1)', [id], (err, queryRes) => {
        if (err) {
            console.error('Error executing query', err);
            res.sendStatus(500);
            return;
        }
        res.send(queryRes.rows[0]);
        return
    });
});

module.exports = { getStudentDataRouter };