const pg = require('pg');
require('dotenv').config();

// const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable` ;

const client = new pg.Client({
    // connectionString: connectionString || process.env.DATABASE_URL,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log(`connected ${process.env.DB_NAME} database on ${process.env.DB_HOST}`)
    }
});

module.exports = client;