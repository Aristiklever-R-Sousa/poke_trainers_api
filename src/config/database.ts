import { Dialect, Sequelize } from 'sequelize';





const dbName = process.env.POSTGRES_DATABASE as string;
const dbUser = process.env.POSTGRES_USER as string;
const dbHost = process.env.POSTGRES_HOST;
const dbPort = process.env.POSTGRES_PORT as unknown as number;
const dbDriver = process.env.POSTGRES_DRIVER as Dialect;
const dbPassword = process.env.POSTGRES_PASSWORD;

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: dbPort,
    dialect: dbDriver
});

export default sequelizeConnection;

// import { Pool } from 'pg';

// async function connect() {
//     console.log(process.env.CONNECTION_STRING);
//     const pool = new Pool({
//         connectionString: process.env.CONNECTION_STRING
//     });

//     const client = await pool.connect();
//     console.log('Has created connection\'s pool!');

//     const res = await client.query('select now()');
//     console.log(res.rows[0]);

//     client.release();

//     return pool.connect();
// }

// connect();
