const { Router } = require('express');
const { db } = require('../db');

const usersRouter = Router();

usersRouter.get('/', (req, res) => {
    db.query('SELECT * from getAllSchoolUsers($1)', [1], (err, queryRes) => {
        if (err) {
          console.error('Error executing query', err);
          res.status(500).send('Error executing query');
          return;
        }
        console.log('Query result:', queryRes.rows);
        res.send(queryRes.rows);
      });
});

// All the endpoints below need to use procedures or functions from the database
usersRouter.get('/:id', (req, res) => {
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

usersRouter.post('/', (req, res) => {
    console.log(req.body);
    const { username, email, password, firstname, lastname, type } = req.body;
    db.query('INSERT INTO "User" (username, email, password, firstname, lastname, type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [username, email, password, firstname, lastname, type], (err, queryRes) => {
        if (err) {
          console.error('Error executing query', err);
          res.status(500).send('Error executing query');
          return;
        }
        console.log('Query result:', queryRes.rows);
        res.send(queryRes.rows);
    });
});

usersRouter.put('/:id', (req, res) => {
    const id = req.params.id;
    const { username, email, password, firstname, lastname, type } = req.body;
    db.query('UPDATE "User" SET username = $1, email = $2, password = $3, firstname = $4, lastname = $5, type = $6 WHERE id = $7 RETURNING *', [username, email, password, firstname, lastname, type, id], (err, queryRes) => {
        if (err) {
          console.error('Error executing query', err);
          res.status(500).send('Error executing query');
          return;
        }
        console.log('Query result:', queryRes.rows);
        res.send(queryRes.rows);
    });
});

usersRouter.delete('/:id', (req, res) => {
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

module.exports = {usersRouter};
