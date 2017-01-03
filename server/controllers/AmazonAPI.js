//add amazon api requests
var util = require('util');
var apac = require( 'apac');
var fs = require( 'fs');

var cred =JSON.parse(fs.readFileSync( __dirname +'/../../config.json', 'utf8')).amazon;
console.log('cred', cred)
var AmazonResponse;
var opHelper = new apac.OperationHelper ({
	awsId: cred.key,
	awsSecret: cred.secret,
	assocId: "donannarni-20",
});


opHelper.execute('ItemSearch', {
  'SearchIndex': 'Fashion',
  'Keywords': 'red polo',
  'ResponseGroup': "Images,ItemAttributes",
  'ItemPage': '2'
}).then((response) => {
    console.log("Results object: ", response.result.ItemSearchResponse.Items.Item);
    // console.log("Raw response body: ", response.responseBody);
    AmazonResponse = response.result
}).catch((err) => {
    console.error("Something went wrong! ", err);
}); 


