const { Router } = require('express');
const { db } = require('../../db');
const bcrypt = require('bcrypt');
const { checkRole } = require('../../middleware/checkRole');
const { roleMapping } = require('../../utils/roleMapping');

const createUserRouter = Router();

createUserRouter.post('/admin', checkRole("create-admin"), async (req, res) => {
    console.log('req.body',req.body);
    const {email, password, firstname, lastname } = req.body;
    const {schoolid} = req.user;
    const roleid = await roleMapping("ADMIN");
    const username = `${firstname}${lastname}`?.toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);

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
        
        db.query('SELECT * FROM  insertUser($1, $2, $3, $4, $5, $6, $7)', [username, email, hashedPassword, firstname, lastname, roleid, schoolid], (err, queryRes) => {
            if (err) {
                console.error('Error executing query', err);
                return res.status(500).send('Error executing query');
            }
            console.log('Query result:', queryRes.rows[0]);
            return res.send(queryRes.rows[0]);
        });
    });
});


createUserRouter.post('/student', checkRole("create-student"), async (req, res) => {
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

    try{
        db.query('SELECT * FROM getSchoolName($1)', [schoolid], (err, queryRes) => {
            if (err) {
                console.error('Error executing query', err);
                return res.status(500).send('Error executing query');
            }
            if (queryRes.rows.length === 0) {
                return res.status(400).send('Invalid school id');
            }
    
            const schoolDomain = queryRes.rows[0].schooldomain ?? queryRes.rows[0].name.replace(" ", "_")?.toLowerCase();

            db.query('SELECT * from getUserName($1, $2)', [firstname, lastname], (err, queryRes) => {
                if (err) {
                    console.error('Error executing query', err);
                    return res.status(500).send('Error executing query');
                }
                const number = queryRes.rows.length;
                const email = `${firstname}.${lastname}${!number ? '' : number}@parent.${schoolDomain}.com`?.toLowerCase();

                db.query('SELECT * FROM  insertUser($1, $2, $3, $4, $5, $6, $7)', [username, email, hashedPassword, firstname, lastname, roleid, schoolid], (err, queryRes) => {
                    if (err) {
                        console.error('Error executing query', err);
                        return res.status(500).send('Error executing query');
                    }
                    console.log('Query result:', queryRes.rows);
                    
                    let {password, ...result} = queryRes.rows[0];
                    
                    db.query('SELECT * FROM insertStudent($1, $2, $3, $4, $5, $6)', [result.id, parentid, personalnumber, classid, birthday, gender], (err, queryRes) => {
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
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error executing query');
    }
});


createUserRouter.post('/teacher', checkRole("create-teacher"), async (req, res) => {
    const { firstname, lastname, personalnumber, birthday, gender, phonenumber, educationlevel, experienceyears, teachingspecialization } = req.body;
    const {schoolid} = req.user;

    if (!firstname || !lastname || !personalnumber || !personalnumber) {
        res.status(400).send('Missing required fields');
        return;
    }
    
    const roleid = await roleMapping("TEACHER")
    const password = personalnumber;
    const hashedPassword = await bcrypt.hash(password, 10);
    const username = `${firstname}${lastname}`?.toLowerCase();
    try{
        db.query('SELECT * FROM getSchoolName($1)', [schoolid], (err, queryRes) => {
            if (err) {
                console.error('Error executing query', err);
                return res.status(500).send('Error executing query');
            }
            if (queryRes.rows.length === 0) {
                return res.status(400).send('Invalid school id');
            }
    
            const schoolDomain = queryRes.rows[0].schooldomain ?? queryRes.rows[0].name.replace(" ", "_")?.toLowerCase();

            db.query('SELECT * from getUserName($1, $2)', [firstname, lastname], (err, queryRes) => {
                if (err) {
                    console.error('Error executing query', err);
                    return res.status(500).send('Error executing query');
                }
                const number = queryRes.rows.length;
                const email = `${firstname}.${lastname}${!number ? '' : number}@${schoolDomain}.com`?.toLowerCase();

                db.query('SELECT * FROM  insertUser($1, $2, $3, $4, $5, $6, $7)', [username, email, hashedPassword, firstname, lastname, roleid, schoolid], (err, queryRes) => {
                    if (err) {
                        console.error('Error executing query', err);
                        return res.status(500).send('Error executing query');
                    }
                    console.log('Query result:', queryRes.rows);
                    let result = queryRes.rows[0];
                    
                    db.query('SELECT * FROM insertTeacher($1, $2, $3, $4, $5, $6, $7, $8)', [result.id, phonenumber, educationlevel, experienceyears, teachingspecialization, personalnumber, birthday, gender], (err, queryRes) => {
                        if (err) {
                            console.error('Error executing query', err);
                            return res.status(500).send('Error executing query');
                        }
                        console.log('Query result:', queryRes.rows);
                        result = [{...result, ...queryRes.rows[0]}];

                        res.send(result);
                    });
                });
            })
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error executing query');
    }
});


createUserRouter.post('/parent', checkRole("create-student"), async (req, res) => {
    const { firstname, lastname, phonenumber, address } = req.body;
    const {schoolid} = req.user;

    if (!firstname || !lastname || !phonenumber) {
        res.status(400).send('Missing required fields');
        return;
    }
    
    const roleid = await roleMapping("PARENT")
    const password = phonenumber;
    const hashedPassword = await bcrypt.hash(password, 10);
    const username = `${firstname}${lastname}`?.toLowerCase();
    try{
        db.query('SELECT * FROM getSchoolName($1)', [schoolid], (err, queryRes) => {
            if (err) {
                console.error('Error executing query', err);
                return res.status(500).send('Error executing query');
            }
            if (queryRes.rows.length === 0) {
                return res.status(400).send('Invalid school id');
            }
    
            const schoolDomain = queryRes.rows[0].schooldomain ?? queryRes.rows[0].name.replace(" ", "_")?.toLowerCase();

            db.query('SELECT * from getUserName($1, $2)', [firstname, lastname], (err, queryRes) => {
                if (err) {
                    console.error('Error executing query', err);
                    return res.status(500).send('Error executing query');
                }
                const number = queryRes.rows.length;
                
                const email = `${firstname}.${lastname}${!number ? '' : number}@parent.${schoolDomain}.com`?.toLowerCase();

                db.query('SELECT * FROM  insertUser($1, $2, $3, $4, $5, $6, $7)', [username, email, hashedPassword, firstname, lastname, roleid, schoolid], (err, queryRes) => {
                    if (err) {
                        console.error('Error executing query', err);
                        return res.status(500).send('Error executing query');
                    }
                    console.log('Query result:', queryRes.rows);
                    let result = queryRes.rows[0];
                    
                    db.query('SELECT * FROM insertParent($1, $2, $3)', [result.id, address, phonenumber], (err, queryRes) => {
                        if (err) {
                            console.error('Error executing query', err);
                            return res.status(500).send('Error executing query');
                        }
                        console.log('Query result:', queryRes.rows);
                        result = [{...result, ...queryRes.rows[0]}];

                        res.send(result);
                    });
                });
            })
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error executing query');
    }
});

module.exports = { createUserRouter };