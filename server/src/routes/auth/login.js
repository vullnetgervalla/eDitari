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
            res.status(500).send('Error executing query');
            return;
        }
        if (queryRes.rows.length === 0) {
            res.status(401).send('Invalid email or password');
            return;
        }
        const user = queryRes.rows[0];
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            res.status(401).send('Invalid email or password');
            return;
        }

        const payload = {
            id: user.id,
            schoolid: user.schoolid,
            type: user.type
        };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        res.json({ accessToken, refreshToken });
    });
});



module.exports = { loginRouter };