require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const user = process.env.DB_USER;
const databaseName = process.env.DB_NAME;
const password = process.env.DB_PASSWORD;
const connectionString = `postgres://${user}:${password}@${host}:${port}`;

const sqlScriptPath = 'src/schema/schema.sql';

async function createDatabaseIfNotExists() {
    const client = new Client({ connectionString });
    await client.connect();

    try {
        const result = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [databaseName]);
        if (result.rows.length === 0) {
            await client.query(`CREATE DATABASE "${databaseName}"`);
            console.log(`Database '${databaseName}' created successfully.`);
        }
        else {
            console.log(`Database '${databaseName}' already exists.`);
        }
    } catch (err) {
        console.error('Error creating database:', err);
    } finally {
        await client.end();
    }
}

async function runScript() {

    await createDatabaseIfNotExists();

    const client = new Client({ connectionString: connectionString + '/' + databaseName });
    await client.connect();

    try {
        const sqlScript = fs.readFileSync(sqlScriptPath, 'utf8');
        await client.query(sqlScript);
        console.log('Database schema successfully created.');
    } catch (err) {
        console.error('Error executing SQL script:', err);
    } finally {
        await client.end();
    }
}

runScript();
