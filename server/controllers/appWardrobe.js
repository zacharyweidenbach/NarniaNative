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
          detailPageUrl: req.body.clothing.DetailPageURL,
          largeImg: req.body.clothing.Image,
          brand: req.body.clothing.Brand,
          color: req.body.clothing.Color,
          thumbnail: req.body.clothing.Thumbnail,
          productTypeName: req.body.clothing.ProductTypeName,
          asin: req.body.clothing.ASIN,
          upc: req.body.clothing.UPC,
          title: req.body.clothing.title,
          position: req.body.position
        };
        connection.query('insert into clothing set ?', clothing, function(err, result) {
          if (err) {
            res.json(err);
          } else {
            var reqbody = {
              userId: req.body.userId,
              clothingId: result.insertId,
              list: req.body.list
            };
            connection.query('insert into wardrobe set ?', reqbody, function(err, result) {
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