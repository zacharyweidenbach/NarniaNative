var query = require('../config').query;
var sqlEscape = require('../config').sqlEscape;

module.exports = {
  gcsUpload: (req, res, next) => {
    const data = req.body;
    if (req.file && req.file.cloudStoragePublicUrl) {
      data.imageUrl = req.file.cloudStoragePublicUrl;
    }
    res.send(data);
  },

  userUpload: (req, res, next) => {
    return query('INSERT INTO clothing SET ?', [req.body.clothing])
    .then((result) => {
      const reqbody = {
        userId: req.body.id,
        clothingId: sqlEscape(result.insertId),
        list: req.body.list
      };
      return query('INSERT INTO wardrobe SET ?', reqbody)
      .then((result) => res.json(result));
    });
  }
};