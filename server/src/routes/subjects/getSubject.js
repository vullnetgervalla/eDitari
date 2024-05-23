const { Router } = require('express');
const { db } = require('../../db');
const { checkRole } = require('../../middleware/checkRole');

const getSubjectRouter = Router();

getSubjectRouter.get('/', checkRole('list-subject'), (req, res) => {
    const {schoolid} = req.user;
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
    const {schoolid} = req.user;
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
    const {schoolid} = req.user;
    db.query('SELECT * from getClientTeacherSubject($1)', [schoolid], (err, queryRes) => {
        if (err) {
          console.error('Error executing query', err);
          res.sendStatus(500);
          return;
        }
        res.send(queryRes.rows);
      });
});

module.exports = { getSubjectRouter };