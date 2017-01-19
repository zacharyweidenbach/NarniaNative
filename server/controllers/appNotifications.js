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
    connection.query('SELECT u.id, u.name, u.thumbnail, p.id, p.body, p.description, n.action FROM notifications n JOIN users u ON u.id = n.senderId JOIN posts p ON p.id = n.postId WHERE n.action="like" and n.userId=' + req.body.userId, function(err, result) {
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
};