var connection = require('../../db/index.js');
module.exports = {
  dummyUser: function(req, res, next) {
    // var user1 = {
    //   name: 'Jonathan',
    //   email: 'MrJonWu@gmail.com',
    //   token: '12345678910',
    //   username: 'MrJonWu',
    //   password: 'password',
    //   thumbnail: 'https://avatars1.githubusercontent.com/u/21250622?v=3&s=460'
    // };
    // var user2 = {
    //   name: 'Haris',
    //   email: 'haris@haris.com',
    //   token: '12345678910',
    //   username: 'Haris',
    //   password: 'password',
    //   thumbnail: 'https://avatars2.githubusercontent.com/u/19330576?v=3&s=460'
    // };
    // var user3 = {
    //   name: 'Rick',
    //   email: 'Rick@rick.com',
    //   token: '12345678910',
    //   username: 'Rick',
    //   password: 'password',
    //   thumbnail: 'https://avatars0.githubusercontent.com/u/20013587?v=3&s=460'
    // };
    var user4 = {
      name: 'Zach',
      email: 'Zach@zach.com',
      token: '12345678910',
      username: 'Zach',
      password: 'password',
      thumbnail: 'https://avatars3.githubusercontent.com/u/14946412?v=3&s=460'
    };

    // connection.query('INSERT INTO users SET ?', user1, function(err, result) {
    //   var response = err || result;
    //   res.json(response);
    // });
    // connection.query('INSERT INTO users SET ?', user2, function(err, result) {
    //   var response = err || result;
    //   res.json(response);
    // });
    // connection.query('INSERT INTO users SET ?', user3, function(err, result) {
    //   var response = err || result;
    //   res.json(response);
    // });
    connection.query('INSERT INTO users SET ?', user4, function(err, result) {
      var response = err || result;
      res.json(response);
    });
  },

  deletePost: function(req, res, next) {
    connection.query('DELETE FROM posts where posts.id=5', function(err, result) {
      var response = err || result;
      res.json(response);
    });
  },

  postToDb: function(req, res, next) {
    console.log('hit');
    console.log(req.body);
    // var time = new Date();
    // var post = {
    //   postId: 0,
    //   userId: 3,
    //   likesCount: 0,
    //   body: 'http://funnycatsgif.com/wp-content/uploads/2015/04/cat-images-funny-picture.jpg',
    //   description: 'this should be a new post from Rick.',
    //   type: 'image',
    //   createdAt: time
    // };
    // var comment = {
    //   postId: 1,
    //   userId: 4,
    //   likesCount: 0,
    //   body: 'blah!',
    //   description: 'null',
    //   type: 'comment',
    //   createdAt: time
    // };
    connection.query('INSERT INTO posts SET ?', req.body, function(err, result) {
      var response = err || result;
      console.log('made it here', response);
      res.json(response);
    });
  },
  getPostsFromDb: function(req, res, next) {

    // connection.query(
    //   'SELECT posts.userId, users.username, users.thumbnail, posts.id, posts.body, posts.description, posts.likesCount, posts.type, posts.shirtId, posts.pantId, posts.shoesId, posts.createdAt, shirt.largeImg as shirtImg, pant.largeImg as pantImg, shoes.largeImg as shoesImg \
    //   FROM users \
    //     INNER JOIN posts on users.id=posts.userId and posts.type="image" \
    //     LEFT JOIN clothing shirt ON shirt.id=posts.shirtId \
    //     LEFT JOIN clothing pant ON pant.id=posts.pantId \
    //     LEFT JOIN clothing shoes ON shoes.id=posts.shoesId \
    //   ORDER BY likesCount DESC', function(err, result) {
    //   var response = err || result;
    //   res.json(response);
    // });

    var weekAgo = new Date().getTime() - (86400000 * 7);
    //86400000 in a day, *7 = 1 week
    if (req.body.row === undefined) {
      connection.query('SELECT posts.userId, users.username, users.thumbnail, posts.id, posts.body, posts.description, posts.likesCount, posts.type, posts.createdAt FROM users INNER JOIN posts on users.id=posts.userId and posts.type="image" and posts.createdAt>' + weekAgo + ' ORDER BY likesCount DESC LIMIT 10', function(err, result) {
        var response = err || result;
        res.json(response);
      });
    } else {
      connection.query('SELECT posts.userId, users.username, users.thumbnail, posts.id, posts.body, posts.description, posts.likesCount, posts.type, posts.createdAt FROM users INNER JOIN posts on users.id=posts.userId and posts.type="image" and posts.createdAt>' + weekAgo + ' ORDER BY likesCount DESC LIMIT ' + req.body.row + ',10', function(err, result) {
        var response = err || result;
        res.json(response);
      });
    }
  },
  getCommentsFromDb: function(req, res, next) {
    connection.query('SELECT posts.userId, users.username, users.thumbnail, posts.id, posts.postId, posts.body, posts.description, posts.likesCount, posts.type, posts.createdAt FROM users INNER JOIN posts on users.id=posts.userId and posts.type="comment" and posts.postId =' + req.body.id, function(err, result) {
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
    connection.query('SELECT p.id, p.body FROM postTags INNER JOIN posts p ON p.id = postTags.postId WHERE tagId=' + req.body.tagId, function(err, result) {
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
