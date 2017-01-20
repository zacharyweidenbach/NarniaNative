//LIBRARIES
var Multer = require('multer');
var path = require('path');

//CONTROLLERS
var appController = require('./controllers/appController.js');
var appAuth = require('./controllers/appAuth.js');
var amazonAPI = require('./controllers/amazonAPI.js');
var appPosts = require('./controllers/appPosts.js');
var appLikesPosts = require('./controllers/appLikesPosts.js');
var appUsersFollowers = require('./controllers/appUsersFollowers.js');
var appLoggedInProfile = require('./controllers/appLoggedInProfile.js');
var appClothing = require('./controllers/appClothing.js');
var appSearchUser = require('./controllers/appSearchUser.js');
var appWardrobe = require('./controllers/appWardrobe.js');
var appTags = require('./controllers/appTags.js');
var appUserUpload = require('./controllers/appUserUpload.js');

//MIDDLEWARE
var imgUpload = require('./middleware/imgUpload.js');

//MUTLER CONFIG
const multer = Multer({
  storage: Multer.memoryStorage(),
  // fileSize: 5 * 1024 * 1024
});

//ROUTES
module.exports = function(app, express) {
  app.get('/', appController.homepage);

  //AUTH
  app.post('/api/users/login', appAuth.login);
  app.post('/api/users/signup', appAuth.signup);
  app.post('/api/users/mbSignup', appAuth.createUser);
  app.post('/api/users/mbLogin', appAuth.mbLogin);
  app.post('/api/users/mobileFbLogin', appAuth.mobileFbLogin);

  //AMAZON API
  app.post('/api/search', amazonAPI.fetchClothes);

  //POSTS
  app.post('/api/getCommentsFromDb', appPosts.getCommentsFromDb);
  app.post('/api/getTagsFromDb', appPosts.getTagsFromDb);
  app.post('/api/getPostsFromDb', appPosts.getPostsFromDb);
  app.post('/api/getPostsFromTag', appPosts.getPostsFromTag);
  app.post('/api/getPostFromPostId', appPosts.getPostFromPostId);
  app.post('/api/increaseLikeCount', appPosts.increaseLikeCount);
  app.post('/api/decreaseLikeCount', appPosts.decreaseLikeCount);
  app.post('/api/postToDb', appPosts.postToDb);
  app.post('/api/deletePost', appPosts.deletePost);

  //TESTS
  app.get('/api/test', appAuth.test);
  app.get('/api/test/findUser', appAuth.findUser);
  app.post('/api/test/removeUser', appAuth.removeUser);
  app.post('/api/createDummy', appPosts.dummyUser);

  //LIKESPOST JOIN TABLE
  app.post('/api/insertLikesPosts', appLikesPosts.insertLike);
  app.post('/api/deleteLikesPosts', appLikesPosts.deleteLike);
  app.post('/api/checkLikeExists', appLikesPosts.checkLikeExists);
  app.post('/api/findLikedPostId', appLikesPosts.findLikedPostId);

  //USERFOLLOWERS JOIN TABLE
  app.post('/api/addFollower', appUsersFollowers.addFollower);
  app.post('/api/deleteFollower', appUsersFollowers.deleteFollower);
  app.post('/api/checkFollower', appUsersFollowers.checkFollower);
  app.post('/api/getNumberOfFollowers', appUsersFollowers.getNumberOfFollowers);
  app.post('/api/getAllFollowersPosts', appUsersFollowers.getAllFollowersPosts);

  //LOGGEDINPROFILE
  app.post('/api/getLoggedInProfile', appLoggedInProfile.getLoggedInProfile);

  //CLOTHING
  app.get('/api/clothing', appClothing.getClothing);
  app.post('/api/checkClothingExists', appClothing.checkClothingExists);

  //SEARCHUSER
  app.post('/api/searchUser', appSearchUser.searchUser);
  app.post('/api/searchUserId', appSearchUser.searchUserId);

  //WARDROBE
  app.post('/api/getWardrobe', appWardrobe.getWardrobe);
  app.post('/api/addToWardrobe', appWardrobe.addToWardrobe);
  app.post('/api/removeFromWardrobe', appWardrobe.removeFromWardrobe);

  //TAGS
  app.post('/api/insertTags', appTags.insertTags);
  app.post('/api/joinPostTags', appTags.joinPostTags);
  app.post('/api/fetchTags', appTags.fetchTags);

  //USERUPLOADS
  app.post('/api/clothingImgUpload', multer.single('userImage'), imgUpload.uploadToGcs, appUserUpload.gcsUpload);
  app.post('/api/userUpload', appUserUpload.userUpload);

  // TEST ROUTES
  app.get('/api/test', appAuth.test);
  app.post('/api/test/removeUser', appAuth.removeUser);
  app.post('/api/test/findUser', appAuth.findUser);
};