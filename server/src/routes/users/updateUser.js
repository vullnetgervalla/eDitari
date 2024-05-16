const { Router } = require('express');
const { db } = require('../../db');

const updateUserRouter = Router();

updateUserRouter.put('/:id', (req, res) => {
    const id = req.params.id;
    const { username, email, password, firstname, lastname, userType } = req.body;
    // in progress, need to delete the child tables also
    db.query('SELECT * FROM updateUser($1, $2, $3, $4, $5, $6, $7)', [id, username, email, password, firstname, lastname, userType], (err, queryRes) => {
        if (err) {
          console.error('Error executing query', err);
          res.status(500).send('Error executing query');
          return;
        }
        console.log('Query result:', queryRes.rows);
        res.send(queryRes.rows);
    });
});

module.exports = { updateUserRouter };