var query = require('../config').query;

const postSelect = 'SELECT posts.userId, users.username, users.thumbnail, posts.id, posts.body, \
                           posts.description, posts.likesCount, posts.type, posts.createdAt, ';

const clothes = ' shirt.largeImg as shirtImg, pant.largeImg as pantImg, shoes.largeImg as shoesImg ';

const leftJoin = ' LEFT JOIN clothing shirt ON shirt.id=posts.shirtId \
                   LEFT JOIN clothing pant ON pant.id=posts.pantId \
                   LEFT JOIN clothing shoes ON shoes.id=posts.shoesId ';

module.exports = {
  dummyUser: (req, res, next) => {
    var testUser = {
      name: 'Zach',
      email: 'Zach@zach.com',
      token: '12345678910',
      username: 'Zach',
      password: 'password',
      thumbnail: 'https://avatars3.githubusercontent.com/u/14946412?v=3&s=460'
    };
    return query('INSERT INTO users SET ?', testUser)
    .then((result) => res.json(result));
  },
  deletePost: (req, res, next) => {
    return query('DELETE FROM posts where posts.id=?', [req.body.postId])
    .then((result) => res.json(result));
  },
  postToDb: (req, res, next) => {
    req.body.userId = req.body.id;
    delete req.body.id;
    return query('INSERT INTO posts SET ?', req.body)
    .then((result) => res.json(result));
  },
  getPostsFromDb: (req, res, next) => {
    //86400000 in a day, *7 = 1 week
    var weekAgo = new Date().getTime() - (86400000 * 50);

    if (req.body.row === undefined) {
      const string = postSelect + clothes + 'FROM users \
        INNER JOIN posts on users.id=posts.userId and posts.type="image" and posts.createdAt> ?' + 
        leftJoin + 'ORDER BY likesCount DESC LIMIT 10';
      return query(string, [weekAgo])
      .then((result) => res.json(result));
    } else {
      const string = postSelect + clothes + 'FROM users \
        INNER JOIN posts on users.id=posts.userId and posts.type="image" and posts.createdAt> ? ' +
        leftJoin + 'ORDER BY likesCount DESC LIMIT ?,10';
      return query(string, [weekAgo, req.body.row])
      .then((result) => res.json(result));
    }
  },
  getPostFromPostId: (req, res, next) => {
    const string = postSelect + clothes + 'FROM users \
      INNER JOIN posts on users.id=posts.userId and posts.type="image" and posts.id=? ' + leftJoin;
    return query(string, [req.body.postId])
    .then((result) => res.json(result));
  },
  getCommentsFromDb: (req, res, next) => {
    const string = postSelect + 'posts.postId \
      FROM users \
        INNER JOIN posts on users.id=posts.userId and posts.type="comment" and posts.postId =? \
      ORDER BY createdAt DESC';
    return query(string, [req.body.postId])
    .then((result) => res.json(result));
  },
  getTagsFromDb: (req, res, next) => {
    const string = 'SELECT t.id, t.tag FROM postTags INNER JOIN tags t ON t.id = postTags.tagId WHERE postId=?';
    return query(string, [req.body.postId])
    .then((result) => res.json(result));
  },
  getPostsFromTag: (req, res, next) => {
    const string = 'SELECT posts.id, posts.body, ' + clothes + 
    'FROM postTags \
      INNER JOIN posts ON posts.id = postTags.postId ' + leftJoin +
    'WHERE tagId=?';
    return query(string, [req.body.tagId])
        .then((result) => res.json(result));
  },
  increaseLikeCount: (req, res, next) => {
    const string = 'UPDATE posts SET likesCount = likesCount + 1 WHERE id = ?';
    return query(string, [req.body.postId])
    .then((result) => res.json(result));
  },
  decreaseLikeCount: (req, res, next) => {
    const string = 'UPDATE posts SET likesCount = likesCount - 1 WHERE id = ?';
    return query(string, [req.body.postId])
    .then((result) => res.json(result));
  },
};
