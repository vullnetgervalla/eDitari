const { Router } = require('express');
const { db } = require('../../db');
const { checkRole } = require('../../middleware/checkRole');
const bcrypt = require('bcrypt');

const updateUserRouter = Router();

updateUserRouter.put('/admin-update', checkRole(null, 'ADMIN'), (req, res) => {
  const { id, firstname, lastname, email } = req.body;
  db.query('SELECT updateAdminUser($1, $2, $3, $4)', [id, firstname, lastname, email], (err, queryRes) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Database error', details: err.message });
      return;
    }
    res.send(queryRes.rows);
  });
});

updateUserRouter.put('/teacher-update', checkRole(null, 'ADMIN'), async (req, res) => {
    const { id, firstname, lastname, email, gender, phonenumber, educationlevel, experienceyears, teachingspecialization, personalnumber, birthday, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query('SELECT updateTeacherUser($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)', [id, firstname, lastname, email, gender, phonenumber, educationlevel, experienceyears, teachingspecialization, personalnumber, birthday, hashedPassword], (err, queryRes) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).send('Error executing query');
            return;
        }
        res.send(queryRes.rows);
    });
});

updateUserRouter.put('/student-update', checkRole(null, ['ADMIN', 'TEACHER']), async (req, res) => {
  const { id, firstname, lastname, email, gender, personalnumber, classid, birthday, parentid, password, address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(id, hashedPassword)
  db.query('SELECT updateStudentUser($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [id, firstname, lastname, email, gender, personalnumber, classid, birthday, parentid, hashedPassword, address], (err, queryRes) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.send(queryRes.rows);
  });
});

updateUserRouter.put('/parent-update', checkRole(null, ['ADMIN', 'TEACHER']), async (req, res) => {
  const { id, firstname, lastname, email, address, phonenumber, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  db.query('SELECT updateParentUser($1, $2, $3, $4, $5, $6, $7)', [id, firstname, lastname, email, address, phonenumber, hashedPassword], (err, queryRes) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.send(queryRes.rows);
  });
});

module.exports = { updateUserRouter };