var connection = require('../../db/index.js');

module.exports = {
  addNotification: function(req, res, next) {
    var reqbody = {
      userId: req.body.userId,
      senderId: req.body.senderId,
      postId: req.body.postId,
      action: req.body.action
    };
    connection.query('INSERT INTO notifications set ?', reqbody, function(err, result) {
      var response = err || result;
      res.json(response);
    });
  },
  getNotificationsLikes: function(req, res, next) {
    connection.query('select u.id, u.name, u.thumbnail, p.id, p.body, p.description, n.action from notifications n join users u on u.id = n.senderId join posts p on p.id = n.postId where n.action="like" and n.userId=' + req.body.userId, function(err, result) {
        var response = err || result;
        res.json(response);
    });
  },
  getNotificationsFollows: function(req, res, next) {
    connection.query('', function(err, result) {
      var response = err || result;
      res.json(response);
    });
  }
}