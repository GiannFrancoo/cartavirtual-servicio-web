const { Pool } = require('pg');

const connectionString = 'postgres://rerqjclqdmwgfo:1d8dfbd6e8db3a34bf2717086e7dda2b58ff2e4017864106163842e1975cf8f9@ec2-34-195-233-155.compute-1.amazonaws.com:5432/d8u3l3c715s1md';
const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized:false
    }
});

module.exports = pool;