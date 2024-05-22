const { Router } = require('express');
const { db } = require('../../db');
const { checkRole } = require('../../middleware/checkRole');

const updateUserRouter = Router();

updateUserRouter.put('/admin-update/:id', checkRole(null, ['ADMIN', 'TEACHER']), (req, res) => {
    const id = req.params.id;
    const request_for = req.params.request_for;
    const { email, password, firstName, lastName, role, gender, phoneNumber, educationLevel, experienceYears, teachingSpecialization, personalNumber, birthday, parentId, class } = req.body;
    if(request_for === 'ADMIN'){
      db.query('SELECT updateAdminUser($1, $2, $3, $4, $5, $6)', [id, firstName, lastName, email, role, password], (err, queryRes) => {
          if (err) {
            console.error('Error executing query', err);
            res.status(500).send('Error executing query');
            return;
          }
          res.send(queryRes.rows);
      });
    } else {}
});

module.exports = { updateUserRouter };