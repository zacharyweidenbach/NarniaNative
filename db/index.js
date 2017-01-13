var mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'Narnia',
  multipleStatements: true
});

connection.connect();

module.exports = connection;