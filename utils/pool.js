const poolOptions = require('./poolOptions');
const mysql = require('mysql2/promise');

const pool = mysql.createPool(poolOptions);

module.exports = pool;