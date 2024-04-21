require('dotenv').config();
const express = require('express');
const { db } = require('./db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const credentials = require('./middleware/credentials');
const corsOptions = require('./config/corsOptions');
const { apiRouter } = require('./routes');

const app = express();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

//Temporary test endpoints
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

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


