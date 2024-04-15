const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('./utils');

const refreshRouter = Router();

refreshRouter.post('/', (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        res.status(401).send('Access Denied');
        return;
    }

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
        if (err) {
            res.status(403).send('Invalid Token');
            return;
        }

        const { exp, iat, ...payload } = user;
        const newAccessToken = generateAccessToken(payload);
        const newRefreshToken = generateRefreshToken(payload);

        res.json({ newAccessToken, newRefreshToken });
    });
});

module.exports = { refreshRouter };