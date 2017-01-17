var connection = require('../../db/index.js');

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
  getNumberOfFollowers: function(req, res, next) {
    connection.query('SELECT * FROM userFollowers where followerId=' + req.body.userId, function(err, result) {
      var response = err || result;
      res.json(response);
    });
  },
  getAllFollowersPosts: function(req, res, next) {
    connection.query('SELECT * FROM userFollowers where userId=' + req.body.userId, function(err, result) {
      var str = '';
      var tempArr = [];
      for (var i = 0; i < result.length; i++) {
        tempArr.push(result[i].followerId);
      }
      str = tempArr.join(',');
      if (req.body.postId === undefined) {
        // connection.query('select posts.userId,  users.username, users.thumbnail, posts.id, posts.body, posts.description, posts.likesCount, posts.type, posts.createdAt from users inner join posts on users.id=posts.userId and users.id in (' + str + ') and posts.type="image" ORDER BY posts.createdAt DESC LIMIT 10', function(err, result) {
        //   var response = err || result;
        //   res.json(response);
        // });
        connection.query(
        'SELECT posts.userId, users.username, users.thumbnail, posts.id, posts.body, posts.description, posts.likesCount, posts.type, posts.shirtId, posts.pantId, posts.shoesId, posts.createdAt, shirt.largeImg as shirtImg, pant.largeImg as pantImg, shoes.largeImg as shoesImg \
        FROM users \
          INNER JOIN posts on users.id=posts.userId and users.id in (' + str + ') and posts.type="image" \
          LEFT JOIN clothing shirt ON shirt.id=posts.shirtId \
          LEFT JOIN clothing pant ON pant.id=posts.pantId \
          LEFT JOIN clothing shoes ON shoes.id=posts.shoesId \
        ORDER BY posts.createdAt ASC LIMIT 10', function(err, result) {
          var response = err || result;
          res.json(response);
        });
      } else {
        connection.query('select posts.userId,  users.username, users.thumbnail, posts.id, posts.body, posts.description, posts.likesCount, posts.type, posts.createdAt from users inner join posts on users.id=posts.userId and users.id in (' + str + ') and posts.type="image" and posts.id < ' + req.body.postId + ' ORDER BY posts.createdAt DESC LIMIT 3', function(err, result) {
          var response = err || result;
          res.json(response);
        });
      }
    });
  }
};