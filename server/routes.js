var appController = require('./controllers/appController.js');
var appAuth = require('./controllers/appAuth.js');
var amazonAPI = require('./controllers/AmazonAPI.js');
var appPosts = require('./controllers/appPosts.js');
var appUsers = require('./controllers/appUsers.js');

// ROUTES
module.exports = function(app, express) {

  app.get('/', appController.homepage);
  app.post('/api/users/login', appAuth.login);
  app.post('/api/users/signup', appAuth.signup);
  // app.post('/api/users/fblogin', appAuth.fblogin);
  app.post('/api/users/mobileFbLogin', appAuth.mobileFbLogin);
  //add amazonAPI route
  app.post('/api/search', amazonAPI.fetchClothes);
  //jw
  app.post('/api/getCommentsFromDb', appPosts.getCommentsFromDb);
  app.get('/api/getPostsFromDb', appPosts.getPostsFromDb);

  app.post('/api/increaseLikeCount', appPosts.increaseLikeCount);
  app.post('/api/decreaseLikeCount', appPosts.decreaseLikeCount);
  app.post('/api/createDummy', appPosts.dummyUser);

  app.post('/api/postToDb', appPosts.postToDb);

  app.get('/api/test', appAuth.test);
  app.post('/api/test/setUser', appUsers.setUser);
  app.get('/api/test/getUser', appUsers.getUser);
  app.post('/api/test/deleteUser', appUsers.deleteUser);

  app.post('/api/deletePost', appPosts.deletePost);

};