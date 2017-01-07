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

/*************API FUNCTIONS**************/
var findUser = function(req, res, next) {
  if (!req.body.username) {
    res.send('no username provided');
    return;
  }
  return getUser(req.body.username)
  .then(function(result) {
    // delete result[0].id;
    // delete result[0].createdAt;
    // delete result[0].updatedAt;
    res.json(result);
  });
};

var createUser = function(req, res, next) {
  if (!req.body.username) {
    res.json('no user information');
    return;
  }
  var time = new Date();
  var newUser = {
    name: req.body.name || null,
    email: req.body.email || null,
    token: req.body.token || null,
    username: req.body.username || null,
    password: req.body.password || null,
    thumbnail: req.body.thumbnail || null,
    createdAt: req.body.createdAt || time,
    updatedAt: req.body.updatedAt || time
  };
  return getUser(newUser.username)
  .then(function(response) {
    if (response.length === 0) {
      return setUser(newUser)
      .then(function(result) { // NEED TO GIVE TOKEN AT THIS POINT
        res.json({
          token: 'token',
          id: result.insertId
        });
      });
    } else {
      res.send('user already exists');
    }
  });
};

var removeUser = function(req, res, next) {
  if (!req.body.username) {
    res.json('no user information');
  }
  return deleteUser(req.body.username)
  .then(function(response) {
    res.json(response);
  });
};



module.exports = {
  query: query,
  getUser: getUser,
  setUser: setUser,
  removeUser: removeUser,
  createUser: createUser,
  findUser: findUser,
  deleteUser: deleteUser
};