const { Router } = require('express');
const { db } = require('../../db');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('./utils');

const loginRouter = Router();

loginRouter.post('/', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM "User" WHERE email = $1', [email], async (err, queryRes) => {
        if (err) {
            console.error('Error executing query', err);
            res.sendStatus(500);
            return;
        }
        if (queryRes.rows.length === 0) {
            res.sendStatus(401);
            return;
        }
        const user = queryRes.rows[0];
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            res.sendStatus(401);
            return;
        }

        const payload = {
            id: user.id,
            schoolid: user.schoolid,
            type: user.type
        };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 91 * 24 * 60 * 60 * 1000,
        });
        res.json({ accessToken });
    });
});



module.exports = { loginRouter };