require('dotenv').config();
const jwt = require('jsonwebtoken');

function isTeacherToken(req, res, next) {
  const authToken = req.headers['authorization'];
  if (!authToken) return res.sendStatus(401);

  const token = authToken.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
    if (err) return res.sendStatus(401);
    if (user.userType !== 'TEACHER') return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = { isTeacherToken };