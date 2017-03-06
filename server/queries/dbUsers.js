var query = require('../config').query;

module.exports = {
  getUser: (username) => {
    var queryString = 'SELECT * FROM `users` WHERE `username` = ?';
    return query(queryString, [username])
    .then((result) => {
      if (result.length > 0) {
        return result[0];
      } else {
        return new Error('user not found');
      }
    });
  },
  setUser: (newUser) => {
    var queryString = 'INSERT INTO `users` SET ?';
    return query(queryString, [newUser])
    .then((result) => {
      return result;
    });
  },
  deleteUser: (username) => {
    var queryString = 'DELETE FROM `users` where `username` = ?';
    return query(queryString, [username])
    .then((result) => {
      if (result.affectedRows === 0) {
        return new Error('user doesn\'t exist');
      } else {
        return result;
      }
    });
  }
};

