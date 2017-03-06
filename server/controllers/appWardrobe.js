var query = require('../config').query;
var sqlEscape = require('../config').sqlEscape;

module.exports = {
  getWardrobe: (req, res, next) => {
    return query('SELECT c.* FROM wardrobe w JOIN users u ON u.id = w.userId JOIN clothing c ON c.id = w.clothingId WHERE w.userId=?', [req.body.id])
    .then((result) => res.json(result));
  },
  addToWardrobe: (req, res, next) => {
    return query('SELECT id FROM clothing WHERE upc="' + sqlEscape(req.body.clothing.UPC) + '" OR asin="' + sqlEscape(req.body.clothing.ASIN) + '"')
    .then((result) => {
      if (result.length !== 0) {
        var reqbody = {
          userId: req.body.id,
          clothingId: result[0].id,
          list: req.body.list
        };
        return query('INSERT INTO wardrobe SET ?', reqbody)
        .then((result) => res.json(result));
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
        return query('INSERT into clothing SET ?', clothing)
        .then((result) => {
          const reqbody = {
            userId: req.body.id,
            clothingId: result.insertId,
            list: req.body.list
          };
          return query('INSERT into wardrobe SET ?', reqbody)
          .then((result) => res.json(result));
        });
      }
    });
  },
  removeFromWardrobe: (req, res, next) => {
    return query('DELETE FROM wardrobe WHERE userId=' + req.body.id + ' and clothingId=' + sqlEscape(req.body.clothingId))
    .then((result) => res.json(result));
  },
};