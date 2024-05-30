const { Router } = require('express');
const { db } = require('../../db');
const { checkRole } = require('../../middleware/checkRole');

const updateSubjectRouter = Router();

updateSubjectRouter.put('/grade/', checkRole(null, 'TEACHER'), (req, res) => {;
    const { id, grade, final } = req.body;
    db.query('SELECT * from updateGrade($1, $2, $3)', [id, grade, final], (err, queryRes) => {
        if (err) {
            console.error('Error executing query', err);
            res.sendStatus(500);
            return;
        }
        res.send(queryRes.rows);
    });
});

module.exports = { updateSubjectRouter };