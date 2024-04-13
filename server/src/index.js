require('dotenv').config();
const express = require('express');
const db = require('./db');

const app = express();
const port = 3000;


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/test', (req, res) => {
  db.query('SELECT * FROM "User"', (err, queryRes) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).send('Error executing query');
      return;
    }
    console.log('Query result:', queryRes.rows);
    res.send(JSON.stringify(queryRes.rows));
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


