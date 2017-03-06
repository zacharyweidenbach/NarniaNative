var connection = require('../db/index.js');
var Promise = require('bluebird');

module.exports = {
  /***********ASYNC HELPER FUNCTION*************/
  query: (qString, arrVal) => {
    return new Promise((resolve, reject) => {
      connection.query({
        sql: qString,
        timeout: 40000,
        values: arrVal
      },
      (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  },

  /***********SQL INJECTION ESCAPE FUNCTION*************/
  sqlEscape: (string) => {
    return connection.escape(string).replace(/['"]+/g, '');
  }

};