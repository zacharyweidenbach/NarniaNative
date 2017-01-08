var connection = require('../../db/index.js')

module.exports = {
  getClothing: function(req,res, next) {
    connection.query('SELECT largeImg, id, position FROM clothing', function(err, result) {
      res.json(result)
    })
  }
}


