//add amazon api requests
var util = require('util');
var apac = require( 'apac');
var fs = require( 'fs');
//var connection = require('../../db/index.js')

var cred =JSON.parse(fs.readFileSync( __dirname +'/../../config.json', 'utf8')).amazon;

var AmazonResponse;
var opHelper = new apac.OperationHelper ({
  awsId: cred.key,
  awsSecret: cred.secret,
  assocId: "donannarni-20",
});

module.exports = {

  fetchClothes: function(req, res, next) {
    opHelper.execute('ItemSearch', {
      'SearchIndex': 'Fashion',
      'Keywords': req.body.keyword,
      'ResponseGroup': "Images,ItemAttributes",
      'ItemPage': req.body.page
    }).then((response) => {
        //console.log("Results object: ", response.result.ItemSearchResponse.Items.Item[0]);
        // console.log("Raw response body: ", response.responseBody);
        //fs.writeFileSync(__dirname+"/test.json", JSON.stringify(response.result.ItemSearchResponse.Items))
        AmazonResponse = response.result.ItemSearchResponse.Items.Item
        var images = [];
        for (var i = 0; i < AmazonResponse.length; i++) {
          if (AmazonResponse[i].LargeImage) {
            images.push(AmazonResponse[i].LargeImage.URL)
          }
        }
        console.log(images)
        res.send(JSON.stringify(images))
    }).catch((err) => {
        console.error("Something went wrong! ", err);
    });
  }
} 




