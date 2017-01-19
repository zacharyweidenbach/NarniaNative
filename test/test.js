var expect = require('chai').expect;
var server = require('../server/server.js');
var supertest = require('supertest');

var request = supertest.agent(server);
var connection = require('../db/index.js');

describe('server should', function() {

  describe('GET from /api/test', function () {
    it('returns "success"', function (done) {
      request
      .get('/api/test')
      .expect('"success"', done);
    });
  });

  var testUser = {
    name: 'Bill',
    email: 'bill@gmail.com',
    token: '12345678910',
    username: 'bill',
    password: 'password',
    thumbnail: 'http://www.safarickszoo.com/wp-content/uploads/2014/03/ocelot2.jpg'
  };

  describe('POST from /api/users/mbSignup', function() {
    it('returns response', function(done) {
      request
      .post('/api/users/mbSignup')
      .send(testUser)
      .end(function(err, resp) {
        expect(!!resp.body.token).to.equal(true);
        expect(!!resp.body.id).to.equal(true);
        done();
      });
    });
  });

  describe('POST from /api/test/findUser', function() {
    it('returns response', function(done) {
      request
      .post('/api/test/findUser')
      .send({username: testUser.username})
      .end(function(err, res) {
        expect(res.body[0].username).to.equal(testUser.username);
        done();
      });
    });
  });

  describe('Login from /api/users/mbLogin', function() {
    it('returns response', function(done) {
      request
      .post('/api/users/mbLogin')
      .send({
        username: testUser.username,
        password: testUser.password
      })

      // .expect(function(res) {
      //   expect(!!res.body[0].token).to.equal(true);
      //   expect(!!res.body[0].id).to.equal(true);
      // })
      // .end(function() {
      //   request
      //   .post('/api/test/removeUser')
      //   .send({username: testUser.username})
      //   .end(done);
      // });

      .end(function(err, res) {
        expect(!!res.body.token).to.equal(true);
        expect(!!res.body.id).to.equal(true);
        done();
      });

    });
  });

  var post = {
    postId: 1000,
    userId: 6,
    likesCount: 0,
    body: 'http://funnycatsgif.com/wp-content/uploads/2015/04/cat-images-funny-picture.jpg',
    description: 'this should be a new post from Rick.',
    type: 'image',
    createdAt: new Date()
  };
  var postID;

  describe('Post to db from /api/postToDbp, Fetch and delete', function() {
    it('returns response', function(done) {
      request
      .post('/api/postToDb')
      .send(post)
      .expect(function(res) {
        expect(res.body.affectedRows).to.equal(1);
        postID = res.body.insertId;
      })
      .end(function() {
        request
        .post('/api/getPostFromPostId')
        .send({postId: postID})
        .expect(function(res) {
          expect(res.body[0].body).to.equal(post.body);
        })
        .end(function() {
          request
          .post('/api/deletePost')
          .send({postId: postID})
          .expect(function(res) {
            console.log(res.body, 'RESPONSE+++');
            expect(res.body.affectedRows).to.equal(1);
          })
          .end(done);
        });
      });
    });
  });

});
