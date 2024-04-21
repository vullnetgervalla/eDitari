const { Router } = require('express');
const { db } = require('../../db');
const bcrypt = require('bcrypt');

const createUserRouter = Router();

createUserRouter.post('/', async (req, res) => {
    console.log(req.body);
    const { username, email, password, firstname, lastname, userType, schoolid } = req.body;
    try{
      const hashedPassword = await bcrypt.hash(password, 10);
      
      db.query('INSERT INTO "User" (username, email, password, firstname, lastname, type, schoolid) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [username, email, hashedPassword, firstname, lastname, userType, schoolid], (err, queryRes) => {
          if (err) {
            console.error('Error executing query', err);
            res.status(500).send('Error executing query');
            return;
          }
          console.log('Query result:', queryRes.rows);
          res.send(queryRes.rows);
      });
    }
    catch{
      res.status(500).send('Error executing query');
    }
});

module.exports = { createUserRouter };