const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('./utils');

const refreshRouter = Router();

refreshRouter.get('/', (req, res) => {
    if(!req?.cookies?.refreshToken) {
        return res.sendStatus(401);
    }
    const refreshToken = req?.cookies?.refreshToken;
    
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(401);
        }

        const { exp, iat, ...payload } = user;
        const newAccessToken = generateAccessToken(payload);

        res.json({ accessToken: newAccessToken, ...payload });
    });
});

module.exports = { refreshRouter };