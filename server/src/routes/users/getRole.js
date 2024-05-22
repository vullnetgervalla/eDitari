const { Router } = require('express');
const { db } = require('../../db');
const { checkRole } = require('../../middleware/checkRole');

const getRoleRouter = Router();

getRoleRouter.get('/get-roles', checkRole(null, ['ADMIN', 'TEACHER']), (req, res) => {
  db.query('SELECT * FROM getRoles()', (err, queryRes) => {
    if (err) {
      console.error('Error executing query', err);
      res.sendStatus(500);
      return;
    }
    res.send(queryRes.rows);
  }
  );
});

module.exports = { getRoleRouter };
