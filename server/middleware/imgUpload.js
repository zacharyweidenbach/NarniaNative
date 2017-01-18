'use strict';
const storage = require('@google-cloud/storage');
const fs = require('fs');
var path = require('path');

var cred = JSON.parse(fs.readFileSync( __dirname + '/../../config.json', 'utf8')).google;

const gcs = storage({
  projectId: cred.x_goog_project_id,
  keyFilename: __dirname + '/../../goog.config.json',
});

const bucketName = 'narnia';
const bucket = gcs.bucket(bucketName);

var getPublicUrl = function (filename) {
  return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
};

let ImgUpload = {};

ImgUpload.uploadToGcs = (req, res, next) => {
  if (!req.file) { console.log('multer fail'); return next(); }

  // Can optionally add a path to the gcsname below by concatenating it before the filename
  const gcsname = req.file.originalname;
  const file = bucket.file(gcsname);


  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    }
  });

  stream.on('error', (err) => {
    console.error(err);
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
    next();
  });

  stream.end(req.file.buffer);
};

module.exports = ImgUpload;