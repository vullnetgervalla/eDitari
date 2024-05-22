require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');
const functions = require('../functions');

const host = "localhost";
const port = "5432";
const user = "postgres";
const databaseName = "SchoolDB";
const password = "admin";
const connectionString = `postgres://${user}:${password}@${host}:${port}/${databaseName}`;

async function runScript() {

    const client = new Client({ connectionString });
    await client.connect();

    try {
        for (const scriptPath of functions) {
            const sqlScript = fs.readFileSync(scriptPath, 'utf8');
            await client.query(sqlScript);
            console.log(`Procedures from script ${scriptPath} successfully created.`);
        }
    } catch (err) {
        console.error('Error executing SQL script:', err);
    } finally {
        await client.end();
    }
}

runScript();