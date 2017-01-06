var connection = require('../../db/index.js');

module.exports = {
  dummyUser: function(req, res, next) {
    var user = {
      name: 'Jonathan',
      email: 'mrjonwu@gmail.com',
      token: '12345678910',
      username: 'MrJonWu',
      password: 'password',
      thumbnail: 'http://www.safarickszoo.com/wp-content/uploads/2014/03/ocelot2.jpg'
    };
    connection.query('INSERT INTO users SET ?', user, function(err, result) {
      var response = err || result;
      res.json(response);
    });
  },

  postToDb: function(req, res, next) {
    console.log(req.body);
    var post = {
      postId: 2,
      userId: 1,
      likesCount: 0,
      body: 'http://funnycatsgif.com/wp-content/uploads/2015/04/cat-images-funny-picture.jpg',
      description: 'Check out this awesome outfit of mine.',
      type: 'image'
    };
    connection.query('INSERT INTO posts SET ?', post, function(err, result) {
      var response = err || result;
      res.json(response);
    });
  },
  increaseLikeCount: function(req, res, next) {
    connection.query('UPDATE posts SET likesCount = likesCount + 1 WHERE id = 1', function(err, result) {
      var response = err || result;
      res.json(response); 
    });
  },
  decreaseLikeCount: function(req, res, next) {
    connection.query('UPDATE posts SET likesCount = likesCount - 1 WHERE id = 1', function(err, result) {
      var response = err || result;
      res.json(response); 
    });
  },
  getFromDb: function(req, res, next) {
    connection.query('SELECT users.username, users.thumbnail, posts.body, posts.description, posts.likesCount, posts.type FROM users INNER JOIN posts on users.id=posts.userId', function(err, result) {
      var response = err || result;
      res.json(response);  
    });
  }
};
