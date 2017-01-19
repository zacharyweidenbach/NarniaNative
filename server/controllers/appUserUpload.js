var connection = require('../../db/index.js');

module.exports = {
  gcsUpload: function (req, res, next) {
    const data = req.body;
    if (req.file && req.file.cloudStoragePublicUrl) {
      data.imageUrl = req.file.cloudStoragePublicUrl;
    }
    res.send(data);
  },

  userUpload: function (req, res, next) {
    var clothing = req.body.clothing;
    connection.query('INSERT INTO clothing SET ?', clothing, function(err, result) {
      if (err) {
        res.json(err);
      } else {
        var reqbody = {
          userId: req.body.userId,
          clothingId: result.insertId,
          list: req.body.list
        };
        connection.query('INSERT INTO wardrobe SET ?', reqbody, function(err, result) {
          var response = err || result;
          res.json(response);
        });
      }
    });
  }
};