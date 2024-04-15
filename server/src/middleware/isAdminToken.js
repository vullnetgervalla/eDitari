require('dotenv').config();
const jwt = require('jsonwebtoken');

function isAdminToken(req, res, next) {
  const authToken = req.headers['authorization'];
  if (!authToken) return res.status(401).send('Access Denied');

  const token = authToken.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid Token');
    if (user.type !== 'ADMIN') return res.status(403).send('Unauthorized');
    req.user = user;
    next();
  });
}

module.exports = { isAdminToken };