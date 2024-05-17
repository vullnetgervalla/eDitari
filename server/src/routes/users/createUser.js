const { Router } = require('express');
const { db } = require('../../db');
const bcrypt = require('bcrypt');
const { isAdminToken } = require('../../middleware/isAdminToken');
const { isAdminTeacherToken} = require('../../middleware/isAdminTeacherToken');
const { roleMapping } = require('../../utils/roleMapping');

const createUserRouter = Router();


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
    const roleid = roleMapping("ADMIN");
    const username = `${firstname}${lastname}`?.toLowerCase();
    if( !email || !password || !firstname || !lastname || !roleid || !schoolid) {
        return res.status(400).send('Missing required fields');
    }

    db.query('SELECT * FROM getSchoolName($1)', [schoolid], (err, queryRes) => {
        if (err) {
            console.error('Error executing query', err);
            return res.status(500).send('Error executing query');
        }
        if (queryRes.rows.length === 0) {
            return res.status(400).send('Invalid school id');
        }

        const schoolDomain = queryRes.rows[0].schooldomain ?? queryRes.rows[0].name.replace(" ", "_")?.toLowerCase();
        if(email.split('@')[1] !== `${schoolDomain}.com`) {
            return res.status(400).send('Invalid email domain');
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        
        db.query('INSERT INTO "User" (username, email, password, firstname, lastname, roleid, schoolid) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [username, email, hashedPassword, firstname, lastname, roleId, schoolid], (err, queryRes) => {
            if (err) {
                console.error('Error executing query', err);
                return res.status(500).send('Error executing query');
            }
            console.log('Query result:', queryRes.rows[0]);
            return res.send(queryRes.rows[0]);
        });
    });
});

createUserRouter.post('/student', isAdminTeacherToken, async (req, res) => {
    const { firstname, lastname, personalnumber, classid, birthday, gender, parentid } = req.body;
    const {schoolid} = req.user;

    if (!firstname || !lastname || !personalnumber || !classid) {
        res.status(400).send('Missing required fields');
        return;
    }

    const roleid = await roleMapping("STUDENT")
    const password = personalnumber;
    const hashedPassword = await bcrypt.hash(password, 10);
    const username = `${firstname}${lastname}`?.toLowerCase();
    const schoolDomain = "main";
    try{
        db.query('SELECT * from getUserName($1, $2)', [firstname, lastname], (err, queryRes) => {
            if (err) {
                console.error('Error executing query', err);
                return res.status(500).send('Error executing query');
            }
            const number = queryRes.rows.length;
            console.log('number', number, 'queryRes.rows', queryRes.rows)
            const email = `${firstname}.${lastname}${!number ? '' : number}@student.${schoolDomain}.com`?.toLowerCase();

            db.query('INSERT INTO "User" (username, email, password, firstname, lastname, roleid, schoolid) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [username, email, hashedPassword, firstname, lastname, roleid, schoolid], (err, queryRes) => {
                if (err) {
                    console.error('Error executing query', err);
                    return res.status(500).send('Error executing query');
                }
                console.log('Query result:', queryRes.rows);
                
                let {password, ...result} = queryRes.rows[0];
                
                db.query('INSERT INTO Student (id, parentid, personalnumber, classid, birthday, gender) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [result.id, parentid, personalnumber, classid, birthday, gender], (err, queryRes) => {
                    if (err) {
                        console.error('Error executing query', err);
                        return res.status(500).send('Error executing query');
                    }
                    console.log('Query result:', queryRes.rows);
                    result = [{...result, ...queryRes.rows[0]}];

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
    
    const roleid = await roleMapping("TEACHER")
    const password = personalnumber;
    const hashedPassword = await bcrypt.hash(password, 10);
    const username = `${firstname}${lastname}`?.toLowerCase();
    try{
        db.query('SELECT * from getUserName($1, $2)', [firstname, lastname], (err, queryRes) => {
            if (err) {
                console.error('Error executing query', err);
                return res.status(500).send('Error executing query');
            }
            const number = queryRes.rows.length;
            const email = `${firstname}.${lastname}${number ? '' : number}@student.${schoolDomain}.com`?.toLowerCase();

            db.query('INSERT INTO "User" (username, email, password, firstname, lastname, roleid, schoolid) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [username, email, hashedPassword, firstname, lastname, roleid, schoolid], (err, queryRes) => {
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