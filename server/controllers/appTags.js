var query = require('../config').query;
var sqlEscape = require('../config.js').sqlEscape;

module.exports = {
  fetchTags: (req, res, next) => {
    const tag = sqlEscape(req.body.tag);
    return query('SELECT * FROM tags WHERE tag LIKE "%' + tag + '%"')
    .then((result) => res.json(result));
  },

  insertTags: (req, res, next) => {
    const matches = req.body.matches;

    var queryString = matches.reduce((string, hashtag) => {
      hashtag = sqlEscape(hashtag);
      string += 'UPDATE tags SET count=count+1 WHERE tag="' + hashtag + '"; INSERT INTO tags (tag) SELECT * FROM (SELECT "' + hashtag + '") AS tmp WHERE NOT EXISTS (SELECT tag FROM tags WHERE tag="' + hashtag + '") LIMIT 1; ';
      return string;
    }, '');

    return query(queryString)
    .then((result) => res.json(result));
  },

  joinPostTags: (req, res, next) => {
    var hashtags = req.body.hashtags.map((tag) => {
      tag = sqlEscape(tag);
      return '"' + tag + '"';
    });
    var tagQuery = 'SELECT id FROM tags WHERE tag in (' + hashtags.join(',') + ');';
    
    return query(tagQuery) 
    .then((result) => {
      var joinQuery = result.reduce((string, tag) => {
        string += 'INSERT INTO postTags (postId, tagId) VALUES (' + req.body.postId + ',' + tag.id + '); ';
        return string;
      }, '');
      return query(joinQuery)
      .then((result) => res.json(result)) ;
    });
  }
};