import { Pool } from 'pg';

async function connect() {
    console.log(process.env.CONNECTION_STRING);
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    });

    const client = await pool.connect();
    console.log('Has created connection\'s pool!');

    const res = await client.query('select now()');
    console.log(res.rows[0]);

    client.release();

    return pool.connect();
}

connect();
