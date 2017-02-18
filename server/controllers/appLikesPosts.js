var connection = require('../../db/index.js');

module.exports = {
  deleteLike: function(req, res, next) {
    connection.query('DELETE FROM likesPosts where userId=' + req.body.id + ' and postId=' + req.body.postId, function(err, result) {
      var response = err || result;
      res.json(response);
    });
  },
  insertLike: function(req, res, next) {
    console.log('USERID', req.body.userId, 'ID', req.body.id)
    var reqbody = {
      userId: req.body.id,
      postId: req.body.postId,
    };
    connection.query('INSERT INTO likesPosts SET ?', reqbody, function(err, result) {
      var response = err || result;
      res.json(response);
    });
  },
  checkLikeExists: function(req, res, next) {
    connection.query('SELECT * FROM likesPosts where userId=' + req.body.id + ' and postId=' + req.body.postId, function(err, result) {
      var response = err || result;
      res.json(response);
    });
  },
  findLikedPostId: function(req, res, next) {
    connection.query('SELECT * FROM likesPosts where userId=' + req.body.id, function(err, result) {
      var str = result.reduce((string, item) => {
        if (!string) return item.postId; 
        return string + ',' + item.postId;
      }, '');
      connection.query('select * from posts where id in (' + str + ')', function(err, result) {
        var response = err || result;
        res.json(response); 
      });
    });
  }
};