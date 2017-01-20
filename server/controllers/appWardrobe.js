var connection = require('../../db/index.js');

module.exports = {
  getWardrobe: function(req, res, next) {
    connection.query('SELECT c.* FROM wardrobe w JOIN users u ON u.id = w.userId JOIN clothing c ON c.id = w.clothingId WHERE w.userId=' + req.body.userId, function(err, result) {
      var response = err || result;
      res.json(response);
    });
  },
  addToWardrobe: function(req, res, next) {
    connection.query('SELECT id FROM clothing WHERE upc="' + req.body.clothing.UPC + '" OR asin="' + req.body.clothing.ASIN + '"', function(err, result) {
      if (err) {
        res.send(err);
      } else if (result.length !== 0) {
        var reqbody = {
          userId: req.body.userId,
          clothingId: result[0].id,
          list: req.body.list
        };
        connection.query('INSERT INTO wardrobe SET ?', reqbody, function(err, result) {
          var response = err || result;
          res.json(response);
        });
      } else {
        var clothing = {
          detailPageUrl: req.body.clothing.detailPageUrl,
          largeImg: req.body.clothing.largeImg,
          brand: req.body.clothing.brand,
          color: req.body.clothing.color,
          thumbnail: req.body.clothing.thumbnail,
          productTypeName: req.body.clothing.productTypeName,
          asin: req.body.clothing.asin,
          upc: req.body.clothing.upc,
          title: req.body.clothing.title,
          position: req.body.position
        };
        connection.query('INSERT into clothing SET ?', clothing, function(err, result) {
          if (err) {
            res.json(err);
          } else {
            var reqbody = {
              userId: req.body.userId,
              clothingId: result.insertId,
              list: req.body.list
            };
            connection.query('INSERT into wardrobe SET ?', reqbody, function(err, result) {
              var response = err || result;
              res.json(response);
            });
          }
        });
      }
    });
  },
  removeFromWardrobe: function(req, res, next) {
    connection.query('DELETE FROM wardrobe WHERE userId=' + req.body.userId + ' and clothingId=' + req.body.clothingId, function(err, result) {
      var response = err || result;
      res.json(response);
    });
  },
};