const { Router } = require('express');
const { db } = require('../../db');
const { isAdminToken } = require('../../middleware/isAdminToken');

const getUserRouter = Router();

getUserRouter.get('/', isAdminToken, (req, res) => {
    const {id, schoolid, type} = req.user;
    db.query('SELECT * from getAllSchoolUsers($1)', [schoolid], (err, queryRes) => {
        if (err) {
          console.error('Error executing query', err);
          res.status(500).send('Error executing query');
          return;
        }
        console.log('Query result:', queryRes.rows);
        res.send(queryRes.rows);
      });
});

getUserRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM "User" WHERE id = $1', [id], (err, queryRes) => {
        if (err) {
          console.error('Error executing query', err);
          res.status(500).send('Error executing query');
          return;
        }
        console.log('Query result:', queryRes.rows);
        res.send(queryRes.rows);
      });
});

module.exports = { getUserRouter };