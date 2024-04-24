const { Router } = require('express');
const { db } = require('../../db');
const bcrypt = require('bcrypt');

const createEmailsRouter = Router();
createEmailsRouter.post('/', async(req, res) => {
    console.log(req.body)

    const{firstname, lastname, social_secutiry_number} = req.body;
})















// const { Pool } = require('pg');
// // Create a PostgreSQL connection pool
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'SchoolDB',
//     password: 'admin',
//     port: 5432,
// });

// // Function to get user credentials from the database based on school ID
// async function getUserCredentials(schoolId) {
//     const client = await pool.connect();
//     try {
//         const query = 'SELECT * FROM getUserCredentials($1)';
//         const result = await client.query(query, [schoolId]);
//         return result.rows;
//     } finally {
//         client.release();
//     }
// }

// const schoolId = 123; // Replace with the actual school ID
// getUserCredentials(schoolId)
//     .then(userCredentials => {
//         console.log(userCredentials);
//         // Do something with the user credentials, such as sending them in a response
//     })
//     .catch(error => {
//         console.error('Error fetching user credentials:', error);
//     });

