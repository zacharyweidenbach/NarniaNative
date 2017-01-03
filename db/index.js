var mysql = require('mysql');
// var path = require('path');

// var knex = require('knex')({
//   client: 'mysql',
//   connection: {
//     host: '127.0.0.1',
//     user: 'root',
//     password: null,
//     database: 'Narnia'
//   },
//   useNullAsDefault: true
// });

// var db = require('bookshelf')(knex);

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 255);
//       user.string('password', 255);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'Narnia'
});

connection.connect();

module.exports = connection;