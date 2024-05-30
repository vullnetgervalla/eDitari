require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const user = process.env.DB_USER;
const databaseName = process.env.DB_NAME;
const password = process.env.DB_PASSWORD;
const connectionString = `postgres://${user}:${password}@${host}:${port}`;

async function deleteDatabaseIfExists() {
    const client = new Client({ connectionString });
    await client.connect();

    try {
        const result = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [databaseName]);
        if (result.rows.length > 0) {
            await client.query(`DROP DATABASE "${databaseName}"`);
            console.log(`Database '${databaseName}' deleted successfully.`);
        }
        else {
            console.log(`Database '${databaseName}' does not exist.`);
        }
    } catch (err) {
        console.error('Error deleting database:', err);
    } finally {
        await client.end();
    }
}

deleteDatabaseIfExists();