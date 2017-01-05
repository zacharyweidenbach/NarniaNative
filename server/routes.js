var appController = require('./controllers/appController.js');
var appAuth = require('./controllers/appAuth.js');
var appPosts = require('./controllers/appPosts.js');

// ROUTES
module.exports = function(app, express) {

  app.get('/', appController.homepage);
  app.post('/api/users/login', appAuth.login);
  app.post('/api/users/signup', appAuth.signup);
  // app.post('/api/users/fblogin', appAuth.fblogin);
  app.post('/api/users/mobileFbLogin', appAuth.mobileFbLogin);

  //jw
  app.post('/api/postToDb', appPosts.postToDb);
};