const { Router } = require('express');
const { db } = require('../../db');

const updateUserRouter = Router();

updateUserRouter.put('/:id', (req, res) => {
    const id = req.params.id;
    const { username, email, password, firstname, lastname, userType } = req.body;
    db.query('UPDATE "User" SET username = $1, email = $2, password = $3, firstname = $4, lastname = $5, type = $6 WHERE id = $7 RETURNING *', [username, email, password, firstname, lastname, userType, id], (err, queryRes) => {
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