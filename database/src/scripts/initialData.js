require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');

const host = 'localhost';
const port = '5432';
const user = 'postgres';
const databaseName = 'SchoolDB';
const password = 'admin';
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
