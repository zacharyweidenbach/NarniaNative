var appController = require('./controllers/appController.js');
var appAuth = require('./controllers/appAuth.js');
var amazonAPI = require('./controllers/AmazonAPI.js');
var appPosts = require('./controllers/appPosts.js');
var appLikesPosts = require('./controllers/appLikesPosts.js');
var appUsersFollowers = require('./controllers/appUsersFollowers.js');
var appLoggedInProfile = require('./controllers/appLoggedInProfile.js');
var appClothing = require('./controllers/appClothing.js');
var appSearchUser = require('./controllers/appSearchUser.js');
var appWardrobe = require('./controllers/appWardrobe.js');

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
  app.post('/api/findLikedPostId', appLikesPosts.findLikedPostId);
  
  //userFollowers join table
  app.post('/api/addFollower', appUsersFollowers.addFollower);
  app.post('/api/deleteFollower', appUsersFollowers.deleteFollower);
  app.post('/api/checkFollower', appUsersFollowers.checkFollower);
  app.post('/api/getNumberOfFollowers', appUsersFollowers.getNumberOfFollowers);
  app.post('/api/getAllFollowersPosts', appUsersFollowers.getAllFollowersPosts);
  
  //get Logged in user's profile information
  app.post('/api/getLoggedInProfile', appLoggedInProfile.getLoggedInProfile);

  //clothing
  app.get('/api/clothing', appClothing.getClothing);
  app.post('/api/checkClothingExists', appClothing.checkClothingExists);
  
  //search user
  app.post('/api/searchUser', appSearchUser.searchUser);

  //wardrobe
  app.post('/api/getWardrobe', appWardrobe.getWardrobe);
  app.post('/api/addToWardrobe', appWardrobe.addToWardrobe);
  app.post('/api/removeFromWardrobe', appWardrobe.removeFromWardrobe);  

};