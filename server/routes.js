var appController = require('./controllers/appController.js');
var appAuth = require('./controllers/appAuth.js');
var amazonAPI = require('./controllers/AmazonAPI.js');
var appPosts = require('./controllers/appPosts.js');
var appUsers = require('./controllers/appUsers.js');
var appLikesPosts = require('./controllers/appLikesPosts.js');

// ROUTES
module.exports = function(app, express) {

  app.get('/', appController.homepage);
  app.post('/api/users/login', appAuth.login);
  app.post('/api/users/signup', appAuth.signup);
  app.post('/api/users/mbSignup', appUsers.createUser);

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
  app.post('/api/test/createUser', appUsers.createUser);
  app.get('/api/test/findUser', appUsers.findUser);
  app.post('/api/test/removeUser', appUsers.removeUser);

  app.post('/api/deletePost', appPosts.deletePost);
  //likesPosts join table
  app.post('/api/insertLikesPosts', appLikesPosts.insertLike);
  app.post('/api/deleteLikesPosts', appLikesPosts.deleteLike);
  app.post('/api/checkLikeExists', appLikesPosts.checkLikeExists);

};