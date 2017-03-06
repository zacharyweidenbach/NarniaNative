var query = require('../config').query;
var sqlEscape = require('../config').sqlEscape;

module.exports = {
  searchUser: (req, res, next) => {
    const username = sqlEscape(req.body.username);
    return query('SELECT * FROM users WHERE username LIKE "%' + username + '%" or email="' + username + '"')
    .then((result) => res.json(result));
  },
  searchUserId: (req, res, next) => {
    return query('SELECT * FROM users WHERE id=?', [req.body.userId])
    .then((result) => res.json(result));
  },
};