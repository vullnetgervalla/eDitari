const { Router } = require('express');
const { db } = require('../../db');
const { isAdminToken } = require('../../middleware/isAdminToken');
const { isAdminTeacherToken } = require('../../middleware/isAdminTeacherToken');
const { authenticateToken } = require('../../middleware/authenticateToken');

const getUserRouter = Router();

getUserRouter.get('/', isAdminToken, (req, res) => {
    const {user, schoolid, userType} = req.user;
    db.query('SELECT * from getAllSchoolUsers($1)', [schoolid], (err, queryRes) => {
        if (err) {
          console.error('Error executing query', err);
          res.sendStatus(500);
          return;
        }

        res.send(queryRes.rows);
      });
});

getUserRouter.get('/roles', isAdminToken, (req, res) => {
    const { schoolid } = req.user;
    const { role } = req.query; 
    db.query('SELECT * from getAllUsersByRole($1, $2)', [schoolid, role], (err, queryRes) => {
      if (err) {
        console.error('Error executing query', err);
        res.sendStatus(500);
        return;
      }
  
      res.send(queryRes.rows);
  });
});

getUserRouter.get('/parents', isAdminTeacherToken, (req, res) => {
  const { user, schoolid } = req.user;
  console.log(typeof schoolid)
    db.query('SELECT * from getAllParentUsers($1)', [schoolid], (err, queryRes) => {
      if (err) {
        console.error('Error executing query', err);
        res.sendStatus(500);
        return;
      }
  
      res.send(queryRes.rows);
  });
});

getUserRouter.get('/capabilities', authenticateToken, (req, res) => {
	const { userType } = req.user;
	db.query('SELECT * from getUsersCapabilities($1)', [userType], (err, queryRes) => {
		if (err) {
			console.error('Error executing query', err);
			res.sendStatus(500);
			return;
		}
		res.send(queryRes.rows);
	});
});

getUserRouter.get('/students', isAdminToken, (req, res) => {
  const {schoolid} = req.user;

  db.query('SELECT * from getSchoolStudents($1)', [schoolid], (err, queryRes) => {
    if (err) {
      console.error('Error executing query', err);
      res.sendStatus(500);
      return;
    }

    res.send(queryRes.rows);
});
});


// This needs to be the last route
getUserRouter.get('/:id', (req, res) => {
  const id = req.params.id;
    db.query('SELECT * from getUser($1)', [id], (err, queryRes) => {
        if (err) {
          console.error('Error executing query', err);
          res.status(500).send('Error executing query');
          return;
        }
        res.send(queryRes.rows[0]);
      });
});

module.exports = { getUserRouter };
