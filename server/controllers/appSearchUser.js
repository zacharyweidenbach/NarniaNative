var connection = require('../../db/index.js');
module.exports = {
  searchUser: function(req, res, next) {
    connection.query('SELECT * FROM users WHERE username LIKE "%' + req.body.username + '%" or email="' + req.body.username + '"', function(err, result) {
      var response = err || result;
      res.json(response);
    });
  },
  searchUserId: function(req, res, next) {
    connection.query('SELECT * FROM users WHERE id=' + req.body.id, function(err, result) {
      var response = err || result;
      res.json(response);
    });
  },
};