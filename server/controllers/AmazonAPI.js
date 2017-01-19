var util = require('util');
var apac = require('apac');
var fs = require( 'fs');
var cred = JSON.parse(fs.readFileSync( __dirname + '/../../config.json', 'utf8')).amazon;
var AmazonResponse;
var opHelper = new apac.OperationHelper ({
  awsId: cred.key,
  awsSecret: cred.secret,
  assocId: cred.tag,
});

module.exports = {
  fetchClothes: function(req, res, next) {
    opHelper.execute('ItemSearch', {
      'SearchIndex': 'Fashion',
      'Keywords': req.body.keyword,
      'ResponseGroup': 'Images,ItemAttributes',
      'ItemPage': req.body.page
    }).then((response) => {
      AmazonResponse = response.result.ItemSearchResponse.Items.Item;
      
      var clothing = [];
      for (var i = 0; i < AmazonResponse.length; i++) {
        if (AmazonResponse[i].LargeImage && AmazonResponse[i].ImageSets && AmazonResponse[i].ImageSets.ImageSet[0] && AmazonResponse[i].ImageSets.ImageSet[0].ThumbnailImage ) {
          clothing.push({
            Image: AmazonResponse[i].LargeImage.URL, 
            DetailPageURL: AmazonResponse[i].DetailPageURL, 
            ProductTypeName: AmazonResponse[i].ItemAttributes.ProductTypeName, 
            Title: AmazonResponse[i].ItemAttributes.Title, 
            ASIN: AmazonResponse[i].ASIN, 
            UPC: AmazonResponse[i].ItemAttributes.UPC, 
            Brand: AmazonResponse[i].ItemAttributes.Brand, 
            Thumbnail: AmazonResponse[i].ImageSets.ImageSet[0].ThumbnailImage.URL, 
            Color: AmazonResponse[i].ItemAttributes.Color
          });
        }
      }
      res.json(clothing);
    }).catch((err) => {
      console.error('Something went wrong!', err);
    });
  }
};