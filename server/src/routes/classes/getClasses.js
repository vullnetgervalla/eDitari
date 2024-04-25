const { Router } = require('express');
const { db } = require('../../db');
const { isAdminTeacherToken } = require('../../middleware/isAdminTeacherToken');
 
const getClassRouter = Router();

getClassRouter.get('/', isAdminTeacherToken, (req, res) => {
    const {user, schoolid, userType} = req.user;
    db.query('SELECT * from getAllSchoolClasses($1)', [schoolid], (err, queryRes) => {
        if (err) {
          console.error('Error executing query', err);
          res.sendStatus(500);
          return;
        }

        res.send(queryRes.rows);
      });
});

module.exports = { getClassRouter };