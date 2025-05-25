const poolOptions = require('./poolOptions');
const mysql = require('mysql/promise');

const pool = mysql.createPool(poolOptions);

const connection = await pool.getConnection();

module.exports = connection;