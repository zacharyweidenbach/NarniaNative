var connection = require('../../db/index.js');

module.exports = {
  checkClothingExists: function(req, res, next) {
    connection.query('SELECT id, title FROM clothing where upc=' + req.body.clothing.upc, function(err, result) {
      var response = err || result;
      res.json(response);
    });
  },
  getClothing: function(req, res, next) {
    connection.query('SELECT largeImg, id, position FROM clothing', function(err, result) {
      res.json(result);
    });
  }
};