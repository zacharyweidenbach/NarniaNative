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
  return new Promise(function(resolve, reject) {
    connection.query({
      sql: 'SELECT * FROM `users` WHERE `username` = ?',
      timeout: 40000,
      values: [username]
    },
    function(err, result) {
      err ? reject(err) : resolve(result);
    });
  });
};

var setUser = function(newUser) {
  return new Promise(function(resolve, reject) {
    connection.query({
      sql: 'INSERT INTO users SET ?',
      timeout: 40000,
      values: [newUser]
    },
    function(err, result) {
      err ? reject(err) : resolve(result);
    });
  });
};

var deleteUser = function(username) {
  return new Promise(function(resolve, reject) {
    connection.query({
      sql: 'DELETE FROM `users` where `username` = ?',
      timeout: 40000,
      values: [username]
    },
    function(err, result) {
      err ? reject(err) : resolve(result);
    });
  });
};


module.exports = {
  query: query,
  getUser: getUser,
  setUser: setUser,
  deleteUser: deleteUser
};