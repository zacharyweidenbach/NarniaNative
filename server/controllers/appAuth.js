require('dotenv').config();
var connection = require('../../db/index.js');
var dbUser = require('./appUsers');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var SALT_WORK_FACTOR = 12;

module.exports = {
  findUser: function(req, res, next) {
    if (!req.body.username) {
      res.json('no username provided');
      return;
    }
    return dbUser.getUser(req.body.username)
    .then(function(result) {
      res.json(result);
    });
  },

  mbLogin: function(req, res, next) {
    if (!req.body.username || !req.body.password) {
      res.send('no username or password provided');
      return;
    }
    return dbUser.getUser(req.body.username)
    .then(function(result) {
      if (Array.isArray(result) && result.length > 0) {
        bcrypt.hash(req.body.username, result[0].salt, null, function (err, hash) {
          if (err) return next(err);
          if (hash === result[0].password) {
            var token = jwt.sign(result[0], 'secret');
            res.json({// GIVE TOKEN AT THIS POINT
              success: true,
              token: token
            });
          } else {
            res.json('Invalid username or password.');
          }
        });
      } else {
        res.json('Invalid username or password.');
      }
    });
  },

  createUser: function(req, res, next) {
    if (!req.body.username) {
      res.json('no user information');
      return;
    }
    return dbUser.getUser(req.body.username)
    .then(function(response) {
      if (response.length === 0) {
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
          if (err) return next(err);
          bcrypt.hash(req.body.username, salt, null, function (err, hash) {
            if (err) return next(err);
            var time = new Date();
            var newUser = {
              name: req.body.name || req.body.username,
              email: req.body.email,
              username: req.body.username,
              password: hash,
              salt: salt,
              createdAt: req.body.createdAt || time,
              updatedAt: req.body.updatedAt || time
            };
            return dbUser.setUser(newUser)
            .then(function(result) {
              newUser.id = result.insertId; 
              res.json({
                success: true,
                token: jwt.sign(newUser, 'secret')
              });
            });
          });
        });
      } else {
        res.json('User already exists.');
      }
    });
  },

  removeUser: function(req, res, next) {
    if (!req.body.username) {
      res.json('no user information');
    }
    return dbUser.deleteUser(req.body.username)
    .then(function(response) {
      res.json(response);
    });
  },
  
  test: function(req, res, next) {
    res.json('success');
  }
};