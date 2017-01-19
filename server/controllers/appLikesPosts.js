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
  findLikedPostId: function(req, res, next) {
    connection.query('SELECT * FROM likesPosts where userId=' + req.body.userId, function(err, result) {
      var str = '';
      var tempArr = [];
      for (var i = 0; i < result.length; i++) {
        tempArr.push(result[i].postId);
      }
      str = tempArr.join(',');

      connection.query('select * from posts where id in (' + str + ')', function(err, result) {
        var response = err || result;
        res.json(response); 
      });
    });
  }
};