var router = require('express').Router();
var jwt = require('jsonwebtoken');
var app = require('./server');

router.use((req, res, next) => {
  var token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.'});
      } else {
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