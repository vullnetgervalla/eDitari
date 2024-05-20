const { Router } = require('express');
const { db } = require('../../db');
const { checkRole } = require('../../middleware/checkRole');

const deleteUserRouter = Router();

deleteUserRouter.delete('/:id', checkRole(null, ['ADMIN', 'TEACHER']), (req, res) => {
    const id = req.params.id;
    const {userType} = req.user;
    // in progress, need to delete the child tables also
    db.query('SELECT * FROM deleteUser($1)', [id], (err, queryRes) => {
        if (err) {
          console.error('Error executing query', err);
          res.status(500).send('Error executing query');
          return;
        }
        console.log('Query result:', queryRes.rows);
        res.send(queryRes.rows);
    });
});

module.exports = { deleteUserRouter };