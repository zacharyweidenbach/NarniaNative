var connection = require('../../db/index.js');

module.exports = {
  fetchTags: function(req, res, next) {
    connection.query('SELECT * FROM tags WHERE tag like "%' + req.body.tag + '%"', function(err, result) {
      var response = err || result;
      res.json(response);
    });
  },

  insertTags: function(req, res, next) {
    var matches = req.body.matches;
    //query all tags in matches
    var queryString = matches.reduce((string, hashtag) => {
      string += 'UPDATE tags SET count=count+1 WHERE tag="' + hashtag + '"; INSERT INTO tags (tag) SELECT * FROM (SELECT "' + hashtag + '") AS tmp WHERE NOT EXISTS (SELECT tag FROM tags WHERE tag="' + hashtag + '") LIMIT 1; ';
      return string;
    }, '');
    // console.log('queryString:', queryString);
    connection.query(queryString, 
      function(err, resultsArr) {
        var response = err || resultsArr;
        if (err) {
          console.log('err', err);
        } else {
          res.json(response);
        }
      }); 
  },

  joinPostTags: function(req, res, next) {
    var hashtags = req.body.hashtags.map(function(tag) {
      return '"' + tag + '"';
    });
    // console.log(hashtags);
    var postId = req.body.postId;
    var tagQuery = 'SELECT id FROM tags WHERE tag in (' + hashtags.join(',') + ');';
    // console.log(tagQuery);
    connection.query(tagQuery, 
      function(err, resultsArr) {
        var response = err || resultsArr;
        if (err) {
          console.log('err', err);
        } else {
          // res.json(response);
          var joinQuery = response.reduce((string, tag) => {
            string += 'INSERT INTO postTags (postId, tagId) VALUES (' + postId + ',' + tag.id + '); ';
            return string;
          }, '');
          // console.log(joinQuery);
          connection.query(joinQuery, 
            function(err, resultsArr) {
              var response = err || resultsArr;
              if (err) {
                console.log('err', err);
              } else {
                res.json(response);
              }
            }); 
        }
      });
  }
};