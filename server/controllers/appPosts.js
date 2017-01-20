var connection = require('../../db/index.js');

module.exports = {
  dummyUser: function(req, res, next) {
    var testUser = {
      name: 'Zach',
      email: 'Zach@zach.com',
      token: '12345678910',
      username: 'Zach',
      password: 'password',
      thumbnail: 'https://avatars3.githubusercontent.com/u/14946412?v=3&s=460'
    };
    connection.query('INSERT INTO users SET ?', testUser, function(err, result) {
      var response = err || result;
      res.json(response);
    });
  },
  deletePost: function(req, res, next) {
    connection.query('DELETE FROM posts where posts.id=' + req.body.postId, function(err, result) {
      var response = err || result;
      res.json(response);
    });
  },
  postToDb: function(req, res, next) {
    connection.query('INSERT INTO posts SET ?', req.body, function(err, result) {
      var response = err || result;
      res.json(response);
    });
  },
  getPostsFromDb: function(req, res, next) {
    //86400000 in a day, *7 = 1 week
    var weekAgo = new Date().getTime() - (86400000 * 7);

    if (req.body.row === undefined) {
      connection.query(
        'SELECT posts.userId, users.username, users.thumbnail, posts.id, posts.body, posts.description, posts.likesCount, posts.type, posts.createdAt, shirt.largeImg as shirtImg, pant.largeImg as pantImg, shoes.largeImg as shoesImg \
        FROM users \
          INNER JOIN posts on users.id=posts.userId and posts.type="image" and posts.createdAt>' + weekAgo + ' \
           LEFT JOIN clothing shirt ON shirt.id=posts.shirtId \
           LEFT JOIN clothing pant ON pant.id=posts.pantId \
           LEFT JOIN clothing shoes ON shoes.id=posts.shoesId \
          ORDER BY likesCount DESC LIMIT 10', function(err, result) {
        var response = err || result;
        res.json(response);
      });
    } else {
      connection.query(
        'SELECT posts.userId, users.username, users.thumbnail, posts.id, posts.body, posts.description, posts.likesCount, posts.type, posts.createdAt, shirt.largeImg as shirtImg, pant.largeImg as pantImg, shoes.largeImg as shoesImg \
        FROM users \
          INNER JOIN posts on users.id=posts.userId and posts.type="image" and posts.createdAt>' + weekAgo + ' \
           LEFT JOIN clothing shirt ON shirt.id=posts.shirtId \
           LEFT JOIN clothing pant ON pant.id=posts.pantId \
           LEFT JOIN clothing shoes ON shoes.id=posts.shoesId \
          ORDER BY likesCount DESC LIMIT ' + req.body.row + ',10', function(err, result) {
        var response = err || result;
        res.json(response);
      });
    }
  },
  getPostFromPostId: function(req, res, next) {
    connection.query('SELECT posts.userId, users.username, users.thumbnail, posts.id, posts.body, posts.description, posts.likesCount, posts.type, posts.createdAt, shirt.largeImg as shirtImg, pant.largeImg as pantImg, shoes.largeImg as shoesImg FROM users INNER JOIN posts on users.id=posts.userId and posts.type="image" and posts.id=' + req.body.postId + ' LEFT JOIN clothing shirt ON shirt.id=posts.shirtId LEFT JOIN clothing pant ON pant.id=posts.pantId LEFT JOIN clothing shoes ON shoes.id=posts.shoesId', function(err, result) {
      var response = err || result;
      res.json(response);
    });
  },
  getCommentsFromDb: function(req, res, next) {
    connection.query('SELECT posts.userId, users.username, users.thumbnail, posts.id, posts.postId, posts.body, posts.description, posts.likesCount, posts.type, posts.createdAt FROM users INNER JOIN posts on users.id=posts.userId and posts.type="comment" and posts.postId =' + req.body.id + ' ORDER BY createdAt DESC', function(err, result) {
      var response = err || result;
      res.json(response);
    });
  },
  getTagsFromDb: function(req, res, next) {
    connection.query('SELECT t.id, t.tag FROM postTags INNER JOIN tags t ON t.id = postTags.tagId WHERE postId=' + req.body.postId, function(err, result) {
      var response = err || result;
      res.json(response);
    });
  },
  getPostsFromTag: function(req, res, next) {
    connection.query(
      'SELECT p.id, p.body, shirt.largeImg as shirtImg, pant.largeImg as pantImg, shoes.largeImg as shoesImg \
      FROM postTags \
        INNER JOIN posts p ON p.id = postTags.postId \
        LEFT JOIN clothing shirt ON shirt.id=p.shirtId \
        LEFT JOIN clothing pant ON pant.id=p.pantId \
        LEFT JOIN clothing shoes ON shoes.id=p.shoesId \
      WHERE tagId=' + req.body.tagId, function(err, result) {
      var response = err || result;
      res.json(response);
    });
  },
  increaseLikeCount: function(req, res, next) {
    connection.query('UPDATE posts SET likesCount = likesCount + 1 WHERE id = ' + req.body.id, function(err, result) {
      var response = err || result;
      res.json(response);
    });
  },
  decreaseLikeCount: function(req, res, next) {
    connection.query('UPDATE posts SET likesCount = likesCount - 1 WHERE id = ' + req.body.id, function(err, result) {
      var response = err || result;
      res.json(response);
    });
  },
};
