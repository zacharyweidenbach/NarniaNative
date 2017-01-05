var connection = require('../../db/index.js');

module.exports = {

  postToDb: function(req, res, next) {
    var post = {
      postId: 1,
      userId: 1,
      body: 'This is a cool comment.',
      type: 'comment'
    };

    connection.query('INSERT INTO posts SET ?', post, function(err, result) {
      var response = err || result;
      res.json(response);
    });
  }
};