var connection = require('../../db/index.js');

module.exports = {
  deleteLike: function(req, res, next) {
    connection.query('DELETE FROM likesPosts where userId=' + req.body.userId + ' and postId=' + req.body.postId, function(err, result) {
      var response = err || result;
      res.json(response);
    });
  },
  insertLike: function(req, res, next) {
    var reqbody = {
      userId: req.body.userId,
      postId: req.body.postId,
    };
    connection.query('INSERT INTO likesPosts SET ?', reqbody, function(err, result) {
      var response = err || result;
      res.json(response);
    });
  },
  checkLikeExists: function(req, res, next) {
    connection.query('SELECT * FROM likesPosts where userId=' + req.body.userId + ' and postId=' + req.body.postId, function(err, result) {
      var response = err || result;
      res.json(response);
    });
  },
  // findLikedByUser: function(req, res, next) {
  //   connection.query('SELECT * FROM likesPosts INNER JOIN posts on posts.Id = and posts.type="image" and likesPosts.userId=' + req.body.userId, function(err, result) {
  //     var response = err || result;
  //     res.json(response);
  //   });
  // }
};

// 'SELECT users.username, users.thumbnail, posts.id, posts.body, posts.description, posts.likesCount, posts.type, posts.createdAt FROM users INNER JOIN posts on users.id=posts.userId and posts.type="image"'