const { Router } = require('express');
const { db } = require('../../db');
const bcrypt = require('bcrypt');
const { isAdminToken } = require('../../middleware/isAdminToken');
 
const createUserRouter = Router();

function isAdminOrTeacherToken(req, res, next) {
    if (isAdminToken(req) || isTeacherToken(req)) {
        next();
    } else {
        res.status(403).send('Unauthorized');
    }
}

// createUserRouter.post('/', async (req, res) => {
//     console.log(req.body);
//     const { userType, schoolid } = req.body;
//     if(!userType || !schoolid) {
//         return res.status(400).send('Missing required fields');
//     }

//     db.query('SELECT name, schoolDomain FROM School WHERE id = $1', [schoolid], (err, queryRes) => {
//         if (err) {
//             console.error('Error executing query', err);
//             return res.status(500).send('Error executing query');
//         }
//         if (queryRes.rows.length === 0) {
//             return res.status(400).send('Invalid school id');
//         }

//         const schoolDomain = queryRes.rows[0].schooldomain ?? queryRes.rows[0].name.replace(" ", "_").toLowerCase();
        
//         if (userType === "ADMIN") {
//             return addAdmin(req, res, schoolDomain);
//         } else if (userType === "STUDENT") {
//             return addStudent(req, res, schoolDomain);
//         } else if (userType === "TEACHER") {
//             return addTeacher(req, res, schoolDomain);
//         } else if (userType === "PARENT") {
//             return addParent(req, res, schoolDomain);
//         } else {
//             return res.status(400).send('Invalid user type');
//         }
//     });
// });

createUserRouter.post('/admin', isAdminToken, async (req, res) => {
    console.log('req.body',req.body);
    const {email, password, firstname, lastname } = req.body;
    const {schoolid} = req.user;
    const userType = "ADMIN";
    const username = `${firstname}${lastname}`.toLowerCase();
    
    if( !email || !password || !firstname || !lastname || !userType || !schoolid) {
        return res.status(400).send('Missing required fields');
    }

    db.query('SELECT name, schoolDomain FROM School WHERE id = $1', [schoolid], (err, queryRes) => {
        if (err) {
            console.error('Error executing query', err);
            return res.status(500).send('Error executing query');
        }
        if (queryRes.rows.length === 0) {
            return res.status(400).send('Invalid school id');
        }

        const schoolDomain = queryRes.rows[0].schooldomain ?? queryRes.rows[0].name.replace(" ", "_").toLowerCase();
        if(email.split('@')[1] !== `${schoolDomain}.com`) {
            return res.status(400).send('Invalid email domain');
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        
        db.query('INSERT INTO "User" (username, email, password, firstname, lastname, type, schoolid) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [username, email, hashedPassword, firstname, lastname, userType, schoolid], (err, queryRes) => {
            if (err) {
                console.error('Error executing query', err);
                return res.status(500).send('Error executing query');
            }
            console.log('Query result:', queryRes.rows[0]);
            return res.send(queryRes.rows[0]);
        });
    });
});

createUserRouter.post('/student', isAdminOrTeacherToken, async (req, res) => {
    const { firstname, lastname, personalnumber, classid, birthday, gender, parentid } = req.body;
    const {schoolid} = req.user;

    if (!firstname || !lastname || !personalnumber || !classid) {
        res.status(400).send('Missing required fields');
        return;
    }

    const userType = "STUDENT"
    const password = personalnumber;
    const hashedPassword = await bcrypt.hash(password, 10);
    const username = `${firstname}${lastname}`.toLowerCase();
    try{
        db.query('SELECT * from getUserName($1, $2)', [firstname, lastname], (err, queryRes) => {
            if (err) {
                console.error('Error executing query', err);
                return res.status(500).send('Error executing query');
            }
            const number = queryRes.rows.length;
            const email = `${firstname}.${lastname}${number ? '' : number}@student.${schoolDomain}.com`.toLowerCase();

            db.query('INSERT INTO "User" (username, email, password, firstname, lastname, type, schoolid) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [username, email, hashedPassword, firstname, lastname, userType, schoolid], (err, queryRes) => {
                if (err) {
                    console.error('Error executing query', err);
                    return res.status(500).send('Error executing query');
                }
                console.log('Query result:', queryRes.rows);
                let result = queryRes.rows[0];
                
                db.query('INSERT INTO Student (id, parentid, personalnumber, classid, birthday, gender) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [result.id, parentid, personalnumber, classid, birthday, gender], (err, queryRes) => {
                    if (err) {
                        console.error('Error executing query', err);
                        return res.status(500).send('Error executing query');
                    }
                    console.log('Query result:', queryRes.rows);
                    result = {...result, ...queryRes.rows[0]};

                    res.send(result);
                });
            });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error executing query');
    }
});

createUserRouter.post('/teacher', isAdminToken, async (req, res) => {
    const { firstname, lastname, personalnumber, classid, birthday, gender, parentid } = req.body;
    const {schoolid} = req.user;
    
    if (!firstname || !lastname || !personalnumber || !classid || !personalnumber) {
        res.status(400).send('Missing required fields');
        return;
    }
    
    const userType = "TEACHER"
    const password = personalnumber;
    const hashedPassword = await bcrypt.hash(password, 10);
    const username = `${firstname}${lastname}`.toLowerCase();
    try{
        db.query('SELECT * from getUserName($1, $2)', [firstname, lastname], (err, queryRes) => {
            if (err) {
                console.error('Error executing query', err);
                return res.status(500).send('Error executing query');
            }
            const number = queryRes.rows.length;
            const email = `${firstname}.${lastname}${number ? '' : number}@student.${schoolDomain}.com`.toLowerCase();

            db.query('INSERT INTO "User" (username, email, password, firstname, lastname, type, schoolid) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [username, email, hashedPassword, firstname, lastname, userType, schoolid], (err, queryRes) => {
                if (err) {
                    console.error('Error executing query', err);
                    return res.status(500).send('Error executing query');
                }
                console.log('Query result:', queryRes.rows);
                let result = queryRes.rows[0];
                
                db.query('INSERT INTO Student (id, parentid, personalnumber, classid, birthday, gender) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [result.id, parentid, personalnumber, classid, birthday, gender], (err, queryRes) => {
                    if (err) {
                        console.error('Error executing query', err);
                        return res.status(500).send('Error executing query');
                    }
                    console.log('Query result:', queryRes.rows);
                    result = {...result, ...queryRes.rows[0]};

                    res.send(result);
                });
            });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error executing query');
    }
});


module.exports = { createUserRouter };