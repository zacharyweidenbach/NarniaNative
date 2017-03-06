var query = require('../config').query;

module.exports = {
  getLoggedInProfile: (req, res, next) => {
    return query('SELECT users.username, users.thumbnail, posts.body, posts.id, posts.userId FROM users INNER JOIN posts on users.id=posts.userId and posts.type="image" and posts.userId=?', [req.body.userId])
    .then((result) => res.json(result));
  }
};