const { Router } = require('express');
const { db } = require('../../db');
const { checkRole } = require('../../middleware/checkRole');

const updateUserRouter = Router();

updateUserRouter.put('/admin-update', checkRole(null, 'ADMIN'), (req, res) => {
  const { id, firstname, lastname, email, role, password } = req.body;
  db.query('SELECT updateAdminUser($1, $2, $3, $4, $5, $6)', [id, firstname, lastname, email, role, password], (err, queryRes) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Database error', details: err.message });
      return;
    }
    res.send(queryRes.rows);
  });
});

updateUserRouter.put('/teacher-update', checkRole(null, 'ADMIN'), (req, res) => {
  const { id, firstname, lastname, email, role, gender, phonenumber, educationlevel, experienceyears, teachingspecialization, personalnumber, birthday, password } = req.body;
  db.query('SELECT updateTeacherUser($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)', [id, firstname, lastname, email, role, gender, phonenumber, educationlevel, experienceyears, teachingspecialization, personalnumber, birthday, password], (err, queryRes) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.send(queryRes.rows);
  });
});

updateUserRouter.put('/student-update', checkRole(null, ['ADMIN', 'TEACHER']), (req, res) => {
  const { id, firstname, lastname, email, role, gender, personalnumber, classid, birthday, parent, password, address } = req.body;
  db.query('SELECT updateStudentUser($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)', [id, firstname, lastname, email, role, gender, personalnumber, classid, birthday, parent, password, address], (err, queryRes) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.send(queryRes.rows);
  });
});

updateUserRouter.put('/parent-update', checkRole(null, ['ADMIN', 'TEACHER']), (req, res) => {
  const { id, firstname, lastname, email, role, address, phonenumber, password } = req.body;
  db.query('SELECT updateParentUser($1, $2, $3, $4, $5, $6, $7, $8)', [id, firstname, lastname, email, role, address, phonenumber, password], (err, queryRes) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.send(queryRes.rows);
  });
});

module.exports = { updateUserRouter };