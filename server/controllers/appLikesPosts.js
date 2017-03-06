var query = require('../config').query;
var sqlEscape = require('../config').sqlEscape;

module.exports = {
  deleteLike: (req, res, next) => {
    return query('DELETE FROM likesPosts where userId=? and postId=?', [req.body.id, req.body.postId])
    .then((result) => res.json(result));
  },
  insertLike: (req, res, next) => {
    var reqbody = {
      userId: req.body.id,
      postId: sqlEscape(req.body.postId),
    };
    return query('INSERT INTO likesPosts SET ?', reqbody)
    .then((result) => res.json(result));
  },
  checkLikeExists: (req, res, next) => {
    return query('SELECT * FROM likesPosts where userId=? and postId=?', [req.body.id, req.body.postId])
    .then((result) => res.json(result));
  },
  findLikedPostId: (req, res, next) => {
    return query('SELECT * FROM likesPosts where userId=?', [req.body.id])
    .then((result) => {
      var postIds = result.reduce((string, item) => (
        !string ? item.postId : string + ',' + item.postId
      ), '');
      return query('select * from posts where id in (' + postIds + ')')
      .then((result) => res.json(result));
    });
  }
};