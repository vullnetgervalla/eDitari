const { Router } = require('express');
const { db } = require('../../db');
const { checkRole } = require('../../middleware/checkRole');
 
const getClassRouter = Router();

getClassRouter.get('/', checkRole(null, 'ADMIN'), (req, res) => {
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

getClassRouter.get('/numOfStudentsPerClass', checkRole(null, 'ADMIN'), (req, res) => {
    db.query('SELECT * FROM getNumOfStudentsPerClass()', (err, queryRes) => {
      if (err) {
        console.error('Error executing query', err);
        res.sendStatus(500);
        return;
      }
      res.send(queryRes.rows);
    })
})  

module.exports = { getClassRouter };