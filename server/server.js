require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

//MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//SERVER STATIC FILES
app.use(express.static(__dirname + '/../client/public'));
app.use('/scripts', express.static(__dirname + '/../node_modules'));

//ROUTER
require('./routes.js')(app, express);

var port = process.env.PORT || 3000;
if (process.env.PORT) {
  var port = process.env.PORT;
} else {
  console.log('WARNING: environment variable PORT not defined.  Defaulting to 3000');
  var port = 3000;
}

app.listen(port, function() {
  console.log('Server is now listening on port 3000');
});

module.exports = app;