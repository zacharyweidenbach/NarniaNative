var connection = require('../../db/index.js');

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();
var session = require('express-session');

// var passport = require('passport');
// var FacebookStrategy = require('passport-facebook').Strategy;
// require('dotenv').config();
// var session = require('express-session');



// var isLoggedIn = function (req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.sendStatus(401);
// };




module.exports = {

  login: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    connection.query({
      sql: 'SELECT * FROM `users` WHERE `username` = ?',
      timeout: 40000,
      values: [username]
    },
    function(err, result) {
      if (result.length > 0 && result[0].password === password) {
        res.json('you can log in!');
      } else {
        res.json('invalid username or password please try again');
      }
    });
  },

  signup: function(req, res, next) {
    connection.query({
      sql: 'SELECT * FROM `users` WHERE `username` = ?',
      timeout: 40000,
      values: [req.body.username]
    },
    function(err, result) {
      if (result.length > 0) {
        res.json('user exists already');
      } else {
        var time = new Date();
        var newUser = {
          name: null,
          email: null,
          username: req.body.username,
          password: req.body.password,
          createdAt: time,
          updatedAt: time
        };
        connection.query('INSERT INTO users SET ?', newUser, function(err, result) {
          var response = err || result;
          res.json(response);
        });
      }
    });

  },

  fblogin: function(req, res, next) {

    // var users = [
    //   {id: 111, username: 'amy', password: 'amy'},
    //   {
    //     id: '222',
    //     email: 'test@test.com',
    //     name: 'Ben',
    //     token: 'DeSag3sEgaEGaYRNKlQp05@diorw'
    //   }
    // ];

    // var findUser = function(id) {
    //   for (var i = 0; i < users.length; i++) {
    //     if (id === users[i].id) {
    //       return users[i];
    //     }
    //   }
    //   return null;
    // };

    // passport.serializeUser(function (user, done) {
    //   done(null, users[0].id);
    // });
    // passport.deserializeUser(function (id, done) {
    //   done(null, users[0]);
    // });

    // passport.use(new FacebookStrategy({
    //   clientID: process.env.FACEBOOK_APP_ID,
    //   clientSecret: process.env.FACEBOOK_APP_SECRET,
    //   callbackURL: 'http://localhost:3000/auth/facebook/callback'
    // },
    // function (token, refreshToken, profile, done) {
    //   var user = findUser(profile.id);
    //   if (user) {
    //     console.log(users);
    //     return done(null, user);
    //   } else {
    //     var newUser = {
    //       id: profile.id,
    //       name: profile.name.givenName + ' ' + profile.name.familyName,
    //       email: (profile.emails[0].value || '').toLowerCase(),
    //       token: token
    //     };
    //     users.push(newUser);
    //     console.log(users);
    //     return done(null, newUser);
    //   }
    // }));

  },

  mobileFbLogin: function(req, res, next) {
    var body = JSON.parse(req.body._bodyText);
    var token = req.body.url.slice(43);
    connection.query({
      sql: 'SELECT * FROM `users` WHERE `username` = ?',
      timeout: 40000,
      values: [body.id]
    },
    function(err, result) {
      if (result.length > 0) {
        console.log('user exists already');
      } else {
        var time = new Date();
        var newUser = {
          name: body.name,
          email: null,
          token: token,
          username: body.id,
          password: null,
          createdAt: time,
          updatedAt: time
        };
        connection.query('INSERT INTO users SET ?', newUser, function(err, result) {
          var response = err || result;
          // console.log(response);
        });
      }
    });

    // console.log(req.body);
  }
};