const { Router } = require('express');
const { db } = require('../../db');
const { checkRole } = require('../../middleware/checkRole');

const deleteSubjectRouter = Router();

deleteSubjectRouter.delete('/grade/:id', checkRole(null, 'TEACHER'), (req, res) => {
    const { id } = req.params;
    db.query('SELECT * from deleteGrade($1)', [id], (err, queryRes) => {
        if (err) {
            console.error('Error executing query', err);
            res.sendStatus(500);
            return;
        }
        res.send(queryRes.rows);
    });
});

module.exports = { deleteSubjectRouter };