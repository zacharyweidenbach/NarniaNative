var appController = require('./controllers/appController.js');
var appAuth = require('./controllers/appAuth.js');
var amazonAPI = require('./controllers/AmazonAPI.js');
var appPosts = require('./controllers/appPosts.js');
var appLikesPosts = require('./controllers/appLikesPosts.js');

// ROUTES
module.exports = function(app, express) {

  app.get('/', appController.homepage);
  app.post('/api/users/login', appAuth.login);
  app.post('/api/users/signup', appAuth.signup);
  app.post('/api/users/mbSignup', appAuth.createUser);
  app.post('/api/users/mbLogin', appAuth.mbLogin);

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

  // TEST ROUTES
  app.get('/api/test', appAuth.test);
  app.post('/api/test/createUser', appAuth.createUser);
  app.get('/api/test/findUser', appAuth.findUser);
  app.post('/api/test/removeUser', appAuth.removeUser);

  app.post('/api/deletePost', appPosts.deletePost);
  //likesPosts join table
  app.post('/api/insertLikesPosts', appLikesPosts.insertLike);
  app.post('/api/deleteLikesPosts', appLikesPosts.deleteLike);
  app.post('/api/checkLikeExists', appLikesPosts.checkLikeExists);

};