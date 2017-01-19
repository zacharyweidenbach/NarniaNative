var connection = require('../../db/index.js');
var Promise = require('bluebird');
require('dotenv').config();


/***********ASYNC HELPER FUNCTION*************/
var query = function(qString, arrVal) { // generic promisified query function
  return new Promise(function(resolve, reject) {
    connection.query({
      sql: qString,
      timeout: 40000,
      values: arrVal
    },
    function(err, result) {
      err ? reject(err) : resolve(result);
    });
  });
};

var getUser = function(username) {
  var queryString = 'SELECT * FROM `users` WHERE `username` = ?';
  return query(queryString, [username]);
};

var setUser = function(newUser) {
  var queryString = 'INSERT INTO users SET ?';
  return query(queryString, [newUser]);
};

var deleteUser = function(username) {
  var queryString = 'DELETE FROM `users` where `username` = ?';
  return query(queryString, [username]);
};

module.exports = {
  query: query,
  getUser: getUser,
  setUser: setUser,
  deleteUser: deleteUser
};