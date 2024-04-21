require('dotenv').config();
const jwt = require('jsonwebtoken');

function isAdminToken(req, res, next) {
  const authToken = req.headers['authorization'] || req.headers['Authorization'];
  if (!authToken) return res.sendStatus(401);

  const token = authToken.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
    if (err) return res.sendStatus(401);
    if (user.userType !== 'ADMIN') return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = { isAdminToken };