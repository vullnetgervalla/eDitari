const { Router } = require('express');
const { db } = require('../../db');
const { checkRole } = require('../../middleware/checkRole');

const createSubjectRouter = Router();

createSubjectRouter.post('/', checkRole('create-subject'), (req, res) => {
    const {schoolid} = req.user;
    const {name} = req.body;
    db.query('SELECT createSubject($1, $2)', [name, schoolid], (err, queryRes) => {
        if (err) {
          console.error('Error executing query', err);
          res.sendStatus(500);
          return;
        }
        res.send(queryRes.rows);
      });
});

createSubjectRouter.post('/teacherSubject', checkRole('create-subject'), (req, res) => {
    const {teacherid, subjectid, yearid, isactive, classid} = req.body;
    db.query('SELECT createTeacherSubject($1, $2, $3, $4, $5)', [teacherid, subjectid, yearid, isactive, classid], (err, queryRes) => {
        if (err) {
          console.error('Error executing query', err);
          res.sendStatus(500);
          return;
        }
        res.send(queryRes.rows);
      });
});

module.exports = { createSubjectRouter };