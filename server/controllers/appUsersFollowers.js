var query = require('../config').query;

module.exports = {
  addFollower: (req, res, next) => {
    var reqbody = {
      userId: req.body.userId,
      followerId: req.body.id,
    };
    return query('INSERT INTO userFollowers SET ?', reqbody)
    .then((result) => res.json(result));
  },
  deleteFollower: (req, res, next) => {
    return query('DELETE FROM userFollowers WHERE userId = ? and followerId = ?', [req.body.userId, req.body.id])
    .then((result) => res.json(result));
  },
  checkFollower: (req, res, next) => {
    return query('SELECT * FROM userFollowers WHERE userId = ? and followerId = ?', [req.body.userId, req.body.id])
    .then((result) => res.json(result));
  },
  getNumberOfFollowers: (req, res, next) => {
    return query('SELECT * FROM userFollowers WHERE followerId = ?', [req.body.id])
    .then((result) => res.json(result));
  },
  getAllFollowersPosts: (req, res, next) => {
    return query('SELECT * FROM userFollowers WHERE followerId=' + req.body.id)
    .then((result) => {
      var userIds = result.reduce((string, item) => string + ',' + item.userId, req.body.id);
      const sqlStart = 'SELECT posts.userId, users.username, users.thumbnail, posts.id, posts.body, posts.description, posts.likesCount, posts.type, posts.createdAt, posts.shirtId, posts.pantId, posts.shoesId, shirt.largeImg as shirtImg, pant.largeImg as pantImg, shoes.largeImg as shoesImg FROM users INNER JOIN posts on users.id=posts.userId and users.id in (' + userIds + ') and posts.type="image" ';
      var sqlMiddle = '';
      const sqlEnd = ' LEFT JOIN clothing shirt ON shirt.id=posts.shirtId LEFT JOIN clothing pant ON pant.id=posts.pantId LEFT JOIN clothing shoes ON shoes.id=posts.shoesId ORDER BY posts.createdAt DESC LIMIT 10';
      if (req.body.postId !== undefined) {
        sqlMiddle = 'and posts.id < ?';
      }
      return query(sqlStart + sqlMiddle + sqlEnd, [req.body.postId])
      .then((result) => res.json(result));
    });
  }
};