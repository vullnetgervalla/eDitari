const { Router } = require('express');
const { db } = require('../../db');
const { checkRole } = require('../../middleware/checkRole');
const { authenticateToken } = require('../../middleware/authenticateToken');

const getCountsRouter = Router();

getCountsRouter.get('/totalUsers', checkRole(null, "ADMIN"), (req, res) => {
    const { user, schoolid } = req.user;
    let role = req.query.role;
    role = role.substring(1, role.length - 1).split(',').map(str => str === '1');
    db.query('SELECT * from getTotalNumberOfUsers($1, $2)', [schoolid, role], (err, queryRes) => {
        if (err) {
            console.error('Error executing query', err);
            res.sendStatus(500);
            return;
        }
        res.send(queryRes.rows);
    });
});

getCountsRouter.get('/totalClasses', checkRole(null, "ADMIN"), (req, res) => {
    const { schoolid } = req.user;
    db.query('SELECT * from getNumOfClasses($1)', [schoolid], (err, queryRes) => {
        if (err) {
            console.error('Error executing query', err);
            res.sendStatus(500);
            return;
        }
        res.send(queryRes.rows);
    });
});

getCountsRouter.get('/topStudents', checkRole(null, "ADMIN"), (req, res) => {
    const {schoolid} = req.user;
    const { limit } = req.query;
    db.query('SELECT * from getTopStudents($1, $2)', [schoolid, limit], (err, queryRes) => {
        if (err) {
          console.error('Error executing query', err);
          res.sendStatus(500);
          return;
        }
  
        res.send(queryRes.rows);
      });
  });

module.exports = { getCountsRouter };