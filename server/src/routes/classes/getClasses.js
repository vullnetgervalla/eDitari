const { Router } = require('express');
const { db } = require('../../db');
const { checkRole } = require('../../middleware/checkRole');
 
const getClassRouter = Router();

getClassRouter.get('/', checkRole('list-class'), (req, res) => {
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

getClassRouter.get('/numOfClasses'), checkRole(null, ['STUDENT']), (req, res) => {
  const {schoolid} = req.user;
  db.query('SELECT * ')
}

getClassRouter.get('/getTeacherCountByGender', checkRole(null, ["ADMIN","TEACHER"]), (req, res) => {
  db.query('SELECT * FROM GetTeacherCountByGender()', (err, queryRes) => {
    if (err) {
      console.error('Error executing query', err);
      res.sendStatus(500);
      return;
    }
    res.send(queryRes.rows);
  })
})

getClassRouter.get('/numOfStudentsPerClass', checkRole(null, ["ADMIN","TEACHER"]), (req, res) => {
    db.query('SELECT * FROM getNumOfStudentsPerClass()', (err, queryRes) => {
      if (err) {
        console.error('Error executing query', err);
        res.sendStatus(500);
        return;
      }
      res.send(queryRes.rows);
    })
})  

getClassRouter.get('/years', checkRole(null, 'ADMIN'), (req, res) => {
  db.query('SELECT * FROM getYears()', (err, queryRes) => {
    if (err) {
      console.error('Error executing query', err);
      res.sendStatus(500);
      return;
    }
    res.send(queryRes.rows);
  })
})

module.exports = { getClassRouter };