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
            largeImg: AmazonResponse[i].LargeImage.URL,  
            detailPageUrl: AmazonResponse[i].DetailPageURL, 
            productTypeName: AmazonResponse[i].ItemAttributes.ProductTypeName, 
            title: AmazonResponse[i].ItemAttributes.Title, 
            asin: AmazonResponse[i].ASIN, 
            upc: AmazonResponse[i].ItemAttributes.UPC, 
            brand: AmazonResponse[i].ItemAttributes.Brand, 
            thumbnail: AmazonResponse[i].ImageSets.ImageSet[0].ThumbnailImage.URL, 
            color: AmazonResponse[i].ItemAttributes.Color
          });
        }
      }
      res.json(clothing);
    }).catch((err) => {
      console.error('Something went wrong!', err);
    });
  }
};