var appController = require('./controllers/appController.js');



// ROUTES
module.exports = function(app, express) {

  app.get('/', appController.homepage);




};