var connection = require('../../db/index.js');
module.exports = {
  searchUser: function(req, res, next) {
    connection.query('SELECT * FROM users where username="' + req.body.username + '"', function(err, result) {
      var response = err || result;
      res.json(response);
    });
  },
};