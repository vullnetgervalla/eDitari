const { Router } = require('express');
const { db } = require('../../db');

const deleteUserRouter = Router();

deleteUserRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM "User" WHERE id = $1', [id], (err, queryRes) => {
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