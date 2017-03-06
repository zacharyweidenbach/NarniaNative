require('dotenv').config();
var router = require('express').Router();
var jwt = require('jsonwebtoken');
var app = require('../server');

router.use((req, res, next) => {
  var token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.'});
      } else {
        req.decoded = decoded;
        req.body.id = decoded.id;
        next();
      }
    });
  } else {
    // if no token, return error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

module.exports = router;