require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const user = process.env.DB_USER;
const databaseName = process.env.DB_NAME;
const password = process.env.DB_PASSWORD;
const connectionString = `postgres://${user}:${password}@${host}:${port}`;

const sqlScriptPath = 'src/scripts/sql/initialData.sql';

async function runScript() {

    const client = new Client({ connectionString: connectionString + '/' + databaseName });
    await client.connect();

    try {
        const sqlScript = fs.readFileSync(sqlScriptPath, 'utf8');
        await client.query(sqlScript);
        console.log('Data added successfully.');
    } catch (err) {
        console.error('Error executing SQL script:', err);
    } finally {
        await client.end();
    }
}

runScript();
