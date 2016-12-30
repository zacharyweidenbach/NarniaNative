var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// SERVER STATIC FILES
app.use(express.static(__dirname + '/../client/public'));
app.use('/scripts', express.static(__dirname + '/../node_modules'));

// ROUTER
require('./routes.js')(app, express);

app.listen(3000, function() {
  console.log('Server is now listening on port 3000');
});

module.exports = app;