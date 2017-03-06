var query = require('../config').query;

module.exports = {
  checkClothingExists: (req, res, next) => {
    return query('SELECT id, title FROM clothing where upc = ?', [req.body.clothing.upc])
    .then((result) => res.json(result));
  },
  getClothing: (req, res, next) => {
    return query('SELECT largeImg, id, position FROM clothing')
    .then((result) => res.json(result));
  }
};