const jwt = require('jsonwebtoken');

function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '30m' });
}

function generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '90d' });
}

module.exports = { generateAccessToken, generateRefreshToken };