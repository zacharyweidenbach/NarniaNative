var connection = require('../../db/index.js');
var Promise = require('bluebird');
require('dotenv').config();



var getUser = function(req, res, next) {
  if (!req.body.username) {
    res.send('no username provided');
    return;
  }
  var echo;
  return new Promise(function(resolve, reject) {
    connection.query({
      sql: 'SELECT * FROM `users` WHERE `username` = ?',
      timeout: 40000,
      values: [req.body.username]
    },
    function(err, result) {
      !err ? resolve(result) : reject(err);
      echo = result;
      // res.send(result[0].password);
    });
  });
  res.send(echo);
};

var setUser = function(req, res, next) {
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
    thumbnail: req.body.password || null,
    createdAt: time,
    updatedAt: time
  };

  return getUser(req, res, next)
  .then(function(response) {
    console.log('PROMISE WORKED');
    console.log(response);
    if (response.length === 0) {
      connection.query('INSERT INTO users SET ?', newUser, function(err, result) {
        err ? res.json(err) : res.send('user has been stored');
      });
    } else {
      res.send('user already exists');
    }
  });
};

module.exports = {
  getUser: getUser,
  setUser: setUser
};

// module.exports = {



//   login: function(req, res, next) {
//     var username = req.body.username;
//     var password = req.body.password;

//     connection.query({
//       sql: 'SELECT * FROM `users` WHERE `username` = ?',
//       timeout: 40000,
//       values: [username]
//     },
//     function(err, result) {
//       if (result.length > 0 && result[0].password === password) {
//         res.json('you can log in!');
//       } else {
//         res.json('invalid username or password please try again');
//       }
//     });
//   },

//   signup: function(req, res, next) {
//     connection.query({
//       sql: 'SELECT * FROM `users` WHERE `username` = ?',
//       timeout: 40000,
//       values: [req.body.username]
//     },
//     function(err, result) {
//       if (result.length > 0) {
//         res.json('user exists already');
//       } else {
//         var time = new Date();
//         var newUser = {
//           name: null,
//           email: null,
//           username: req.body.username,
//           password: req.body.password,
//           createdAt: time,
//           updatedAt: time
//         };
//         connection.query('INSERT INTO users SET ?', newUser, function(err, result) {
//           var response = err || result;
//           res.json(response);
//         });
//       }
//     });

//   },

//   fblogin: function(req, res, next) {

//     // var users = [
//     //   {id: 111, username: 'amy', password: 'amy'},
//     //   {
//     //     id: '222',
//     //     email: 'test@test.com',
//     //     name: 'Ben',
//     //     token: 'DeSag3sEgaEGaYRNKlQp05@diorw'
//     //   }
//     // ];

//     // var findUser = function(id) {
//     //   for (var i = 0; i < users.length; i++) {
//     //     if (id === users[i].id) {
//     //       return users[i];
//     //     }
//     //   }
//     //   return null;
//     // };

//     // passport.serializeUser(function (user, done) {
//     //   done(null, users[0].id);
//     // });
//     // passport.deserializeUser(function (id, done) {
//     //   done(null, users[0]);
//     // });

//     // passport.use(new FacebookStrategy({
//     //   clientID: process.env.FACEBOOK_APP_ID,
//     //   clientSecret: process.env.FACEBOOK_APP_SECRET,
//     //   callbackURL: 'http://localhost:3000/auth/facebook/callback'
//     // },
//     // function (token, refreshToken, profile, done) {
//     //   var user = findUser(profile.id);
//     //   if (user) {
//     //     console.log(users);
//     //     return done(null, user);
//     //   } else {
//     //     var newUser = {
//     //       id: profile.id,
//     //       name: profile.name.givenName + ' ' + profile.name.familyName,
//     //       email: (profile.emails[0].value || '').toLowerCase(),
//     //       token: token
//     //     };
//     //     users.push(newUser);
//     //     console.log(users);
//     //     return done(null, newUser);
//     //   }
//     // }));

//   },

//   mobileFbLogin: function(req, res, next) {
//     var body = JSON.parse(req.body._bodyText);
//     var token = req.body.url.slice(43);
//     connection.query({
//       sql: 'SELECT * FROM `users` WHERE `username` = ?',
//       timeout: 40000,
//       values: [body.id]
//     },
//     function(err, result) {
//       if (result.length > 0) {
//         console.log('user exists already');
//       } else {
//         var time = new Date();
//         var newUser = {
//           name: body.name,
//           email: null,
//           token: token,
//           username: body.id,
//           password: null,
//           createdAt: time,
//           updatedAt: time
//         };
//         connection.query('INSERT INTO users SET ?', newUser, function(err, result) {
//           var response = err || result;
//           // console.log(response);
//         });
//       }
//     });

//     // console.log(req.body);
//   },

//   test: function(req, res, next) {
//     res.json('success');
//   }
// };