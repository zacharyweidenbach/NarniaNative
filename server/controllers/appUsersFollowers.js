// var connection = require('../../db/index.js');

module.exports = {
  addFollower: function(req, res, next) {
    var reqbody = {
      userId: req.body.userId,
      followerId: req.body.followerId,
    };
    connection.query('INSERT INTO userFollowers SET ?', reqbody, function(err, result) {
      var response = err || result;
      res.json(response);
    });
  },
  deleteFollower: function(req, res, next) {
    connection.query('DELETE FROM userFollowers where userId=' + req.body.userId + ' and followerId=' + req.body.followerId, function(err, result) {
      var response = err || result;
      res.json(response);
    });
  },
  checkFollower: function(req, res, next) {
    connection.query('SELECT * FROM userFollowers where userId=' + req.body.userId + ' and followerId=' + req.body.followerId, function(err, result) {
      var response = err || result;
      res.json(response);
    });
  },
  getAllFollowers: function(req, res, next) {
    connection.query('SELECT * FROM userFollowers where userId=' + req.body.userId, function(err, result) {
      var str = '';
      var tempArr = [];
      for (var i = 0; i < result.length; i++) {
        tempArr.push(result[i].followerId);
      }
      str = tempArr.join(',');
      connection.query('select users.id,  users.username, users.thumbnail, posts.id, posts.body, posts.description, posts.likesCount, posts.type, posts.createdAt from users inner join posts on users.id in (' + str + ') and posts.type="image"', function(err, result) {
        var response = err || result;
        res.json(response); 
      });
    });
  }
};