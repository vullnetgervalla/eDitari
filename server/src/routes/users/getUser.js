const { Router } = require('express');
const { db } = require('../../db');
const { checkRole } = require('../../middleware/checkRole');
const { authenticateToken } = require('../../middleware/authenticateToken');

const getUserRouter = Router();

getUserRouter.get('/', checkRole(null, "ADMIN"), (req, res) => {
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

getUserRouter.get('/roles', checkRole("role"), (req, res) => {
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

getUserRouter.get('/parents', checkRole(null, ['ADMIN', 'TEACHER']), (req, res) => {
  const { userid, schoolid } = req.user;
  
    db.query('SELECT * from getAllParentUsers($1)', [schoolid], (err, queryRes) => {
      if (err) {
        console.error('Error executing query', err);
        res.sendStatus(500);
        return;
      }
  
      res.send(queryRes.rows);
  });
});

getUserRouter.get('/teachers', checkRole("list-teacher"), (req, res) => {
  const {schoolid} = req.user;
  db.query('SELECT * from getSchoolTeachers($1)', [schoolid], (err, queryRes) => {
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

getUserRouter.get('/students', checkRole("list-student"), (req, res) => {
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

getUserRouter.get('/teacherSubjects', checkRole(null, "TEACHER"), (req, res) => {
  const { userid, schoolid } = req.user;

  db.query('select * from getTeacherSubjectsSchedule($1, $2)', [userid, schoolid], (err, queryRes) => {
    if (err) {
      console.error('Error executing query', err);
      res.sendStatus(500);
      return;
    }

    res.send(queryRes.rows);
});
});

// This needs to be the last route
getUserRouter.get('/:id', authenticateToken, (req, res) => {
  const id = req.params.id;

  if (!/^\d+$/.test(id)) {
    res.status(400).send('Invalid id');
    return;
  }
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
