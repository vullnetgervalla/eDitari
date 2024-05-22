const { Router } = require('express');
const { db } = require('../../db');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('./utils');

const loginRouter = Router();

loginRouter.post('/', (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        res.sendStatus(400);
        return;
    }
    db.query('SELECT * FROM login($1)', [email], async (err, queryRes) => {
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
            user: user.id,
            schoolid: user.schoolid,
            userType: user.role
        };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 91 * 24 * 60 * 60 * 1000,
        });
        res.json({ accessToken, ...payload});
    });
});



module.exports = { loginRouter };