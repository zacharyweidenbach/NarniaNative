require('dotenv').config();
var dbUsers = require('../queries/dbUsers');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
const SALT_WORK_FACTOR = 12;

module.exports = {
  findUser: (req, res, next) => {
    if (!req.body.username) {
      res.json('no username provided');
      return;
    }
    return dbUsers.getUser(req.body.username)
    .then((result) => res.json(result));
  },

  mbLogin: (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      res.send('no username or password provided');
      return;
    }
    return dbUsers.getUser(req.body.username)
    .then((result) => {
      if (!(result instanceof Error)) {
        bcrypt.hash(req.body.username, result.salt, null, (err, hash) => {
          if (err) return next(err);
          if (hash === result.password) {
            var token = jwt.sign(result, process.env.JWT_SECRET);
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

  createUser: (req, res, next) => {
    if (!req.body.username) {
      res.json('no user information');
      return;
    }
    return dbUsers.getUser(req.body.username)
    .then((response) => {
      if (response instanceof Error) {
        bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
          if (err) return next(err);
          bcrypt.hash(req.body.username, salt, null, (err, hash) => {
            if (err) return next(err);
            const time = new Date();
            var newUser = {
              name: req.body.name || req.body.username,
              email: req.body.email,
              username: req.body.username,
              password: hash,
              salt: salt,
              createdAt: req.body.createdAt || time,
              updatedAt: req.body.updatedAt || time
            };
            return dbUsers.setUser(newUser)
            .then((result) => {
              newUser.id = result.insertId; 
              res.json({
                success: true,
                token: jwt.sign(newUser, process.env.JWT_SECRET)
              });
            });
          });
        });
      } else {
        res.json('User already exists.');
      }
    });
  },

  removeUser: (req, res, next) => {
    if (!req.body.username) {
      res.json('no user information');
    }
    return dbUsers.deleteUser(req.body.username)
    .then((response) => {
      res.json(response);
    });
  },
  
  test: (req, res, next) => {
    res.json('success');
  }
};