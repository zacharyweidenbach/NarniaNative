var express = require('express');
var bodyParser = require('body-parser');
require('dotenv').config();

// var passport = require('passport');
// var FacebookStrategy = require('passport-facebook').Strategy;
// var session = require('express-session');
// var connection = require('../db/index.js');

var app = express();

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// SERVER STATIC FILES
app.use(express.static(__dirname + '/../client/public'));
app.use('/scripts', express.static(__dirname + '/../node_modules'));




// PASSPORT CODE FOR DESKTOP - COMMENTED OUT FOR USE LATER
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

//   connection.query({
//     sql: 'SELECT * FROM `users` WHERE `username` = ?',
//     timeout: 40000,
//     values: [profile.id]
//   },
//   function(err, result) {
//     if (result.length > 0) {
//       console.log('user exists already');
//       return done(null, result);
//     } else {
//       var time = new Date();
//       var newUser = {
//         name: profile.displayName,
//         email: null,
//         username: profile.id,
//         password: null,
//         createdAt: time,
//         updatedAt: time
//       };
//       connection.query('INSERT INTO users SET ?', newUser, function(err, result) {
//         var response = err || result;
//         console.log(response);
//       });
//       return done(null, newUser);
//     }
//   });


// }));

// app.use(session({
//   secret: 'tHiSiSasEcRetStr',
//   resave: true,
//   saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// var isLoggedIn = function (req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.sendStatus(401);
// };

// app.get('/login', function (req, res) {
//   res.redirect('/auth/facebook');
// });

// app.get('/auth/facebook', passport.authenticate('facebook'));
// // handle the callback after facebook has authenticated the user
// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', {
//     successRedirect: '/home',
//     failureRedirect: '/'
//   }));

// app.get('/home', isLoggedIn, function (req, res) {
//   res.json('Congratulations! you\'ve successfully logged in.');
// });

// app.get('/logout', function(req, res) {
//   req.logout();
//   res.send('logout success!');
// });






// ROUTER
require('./routes.js')(app, express);

var port = process.env.PORT || 3000;
if (process.env.PORT) {
  var port = process.env.PORT;
} else {
  console.log('WARNING: environment variable PORT not defined.  Defaulting to 3000');
  var port = 3000;
}

app.listen(port, function() {
  console.log('Server is now listening on port 3000');
});

module.exports = app;