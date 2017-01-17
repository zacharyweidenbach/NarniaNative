var connection = require('../../db/index.js')
var Multer = require('multer');

// Handles the multipart/form-data and sets up the image for upload to Google Cloud Storage services
// Adds a .file key to the request object
// the 'storage' key saves the image temporarily for in memory
// You can also pass a file path on your server and it will save the image there
// const multer = Multer({
//   storage: Multer.MemoryStorage,
//   fileSize: 5 * 1024 * 1024
// });

// var upload = multer.single('image')
module.exports = {
  userUpload: function (req, res, next) {
  //   upload(req, res, function (err) {
  //   if (err) {
  //     console.log('there was an error in the multer', err)
  //     return
  //   }
  //   // Everything went fine
  //   console.log('multer passed', req.file, req.body)
  // })
    console.log('test in appGoogleCloudStorage.js', req.body)
    const data = req.body;
    if (req.file && req.file.cloudStoragePublicUrl) {
      data.imageUrl = req.file.cloudStoragePublicUrl;
    }
    res.send(data);
  }
}