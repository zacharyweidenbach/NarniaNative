var connection = require('../../db/index.js')

module.exports = {
  gcsUpload: function (req, res, next) {
    // upload(req, res, function (err) {
    //   if (err) {
    //     console.log('there was an error in the multer', err)
    //     return
    //   }
    //   // Everything went fine
    //   console.log('multer passed', req.file, req.body)
    // })
    // console.log('test in appGoogleCloudStorage.js', req.fields)
    const data = req.body;
    if (req.file && req.file.cloudStoragePublicUrl) {
      data.imageUrl = req.file.cloudStoragePublicUrl;
    }
    res.send(data);
  },

  userUpload: function (req, res, next) {
    console.log('req body: ', req.body)
    var clothing = req.body.clothing
    connection.query('insert into clothing set ?', clothing, function(err, result) {
      if (err) {
        res.json(err);
      } else {
        var reqbody = {
          userId: req.body.userId,
          clothingId: result.insertId,
          list: req.body.list
        }
        connection.query('insert into wardrobe set ?', reqbody, function(err, result) {
          var response = err || result;
          res.json(response);
        });
      }
    });
  }
}