const { Router } = require('express');
const { db } = require('../../db');
const { checkRole } = require('../../middleware/checkRole');

const createNotificationsRouter = Router();

createNotificationsRouter.post('/create', checkRole(null, ['ADMIN', 'TEACHER']), (req, res) => {
    const { id, title, reach, description, parentid, date, createdat } = req.body;
    db.query('SELECT * FROM createNotification($1, $2, $3, $4, $5, $6, $7)', [id, title, reach, description, parentid, date, createdat], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal server error');
            return;
        }
        res.status(200).json({ message: 'The query was successfull!' });
    });
});

module.exports = { createNotificationsRouter };