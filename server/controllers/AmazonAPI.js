//add amazon api requests
var util = require('util');
var apac = require( 'apac');
var fs = require( 'fs');
//var connection = require('../../db/index.js')

var cred = JSON.parse(fs.readFileSync( __dirname + '/../../config.json', 'utf8')).amazon;

var AmazonResponse;
var opHelper = new apac.OperationHelper ({
  awsId: cred.key,
  awsSecret: cred.secret,
  assocId: 'donannarni-20',
});

module.exports = {

  fetchClothes: function(req, res, next) {
    opHelper.execute('ItemSearch', {
      'SearchIndex': 'Fashion',
      'Keywords': req.body.keyword,
      'ResponseGroup': 'Images,ItemAttributes',
      'ItemPage': req.body.page
    }).then((response) => {
        //console.log("Results object: ", response.result.ItemSearchResponse.Items.Item[0]);
        // console.log("Raw response body: ", response.responseBody);
    /*//creates MYsql insertion query syntax for dummy data
        var clothingSchema = "INSERT INTO 'clothing' (detailUrl, smallImg, mediumImg, largeImg, brand, color, department, listPrice, productGroup, productTypeName, Title, UPC, ASIN) VALUES (" + '"' + response.result.ItemSearchResponse.Items.Item[0].DetailPageURL + '", "' + response.result.ItemSearchResponse.Items.Item[0].SmallImage.URL + '", "' + response.result.ItemSearchResponse.Items.Item[0].MediumImage.URL + '", "' + response.result.ItemSearchResponse.Items.Item[0].LargeImage.URL + '", "' + response.result.ItemSearchResponse.Items.Item[0].ItemAttributes.Brand + '", "' + response.result.ItemSearchResponse.Items.Item[0].ItemAttributes.Color + '", "' +response.result.ItemSearchResponse.Items.Item[0].ItemAttributes.Department + '", "' + response.result.ItemSearchResponse.Items.Item[0].ItemAttributes.ListPrice.FormattedPrice + '", "'+ response.result.ItemSearchResponse.Items.Item[0].ItemAttributes.ProductGroup + '", "' + response.result.ItemSearchResponse.Items.Item[0].ItemAttributes.ProductTypeName + '", "' + response.result.ItemSearchResponse.Items.Item[0].ItemAttributes.Title + '", "' + response.result.ItemSearchResponse.Items.Item[0].ItemAttributes.UPC + '", "' + response.result.ItemSearchResponse.Items.Item[0].ASIN + '");'
        fs.writeFileSync(__dirname+"/clothingInsertionSchema.txt", clothingSchema)
      */
      AmazonResponse = response.result.ItemSearchResponse.Items.Item;
      var images = [];
      for (var i = 0; i < AmazonResponse.length; i++) {
        if (AmazonResponse[i].LargeImage) {
          images.push(AmazonResponse[i].LargeImage.URL);
        }
      }
      console.log(images);
      res.send(JSON.stringify(images));
    }).catch((err) => {
      console.error('Something went wrong!', err);
    });
  }
};







