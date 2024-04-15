require('dotenv').config();
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authToken = req.headers['authorization'];
  if (!authToken) return res.status(401).send('Access Denied');

  const token = authToken.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid Token');
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };