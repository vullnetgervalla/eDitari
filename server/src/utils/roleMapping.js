const { db } = require('../db');

async function roleMapping(role) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM getRoles()', (err, queryRes) => {
            if (err) {
                console.error('Error executing query', err);
                reject(err);
                return;
            }

            resolve(queryRes.rows.find(r => r.name === role).id);
        });
    });
}

module.exports = { roleMapping };
