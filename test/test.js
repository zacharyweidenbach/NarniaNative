var expect = require('chai').expect;
var server = require('../server/server.js');
var supertest = require('supertest');

var request = supertest.agent(server);
var connection = require('../db/index.js');

describe('server should', function() {

  var testPostId;

  var testUser = {
    name: 'Bill',
    email: 'bill@gmail.com',
    token: '12345678910',
    username: 'bill',
    password: 'password',
    thumbnail: 'http://www.safarickszoo.com/wp-content/uploads/2014/03/ocelot2.jpg'
  };
  var testPost = {
    postId: 1000,
    userId: 1,
    likesCount: 0,
    body: 'http://funnycatsgif.com/wp-content/uploads/2015/04/cat-images-funny-picture.jpg',
    description: 'this should be a new post from Rick.',
    type: 'image',
    createdAt: new Date()
  };

  var testToken;

  // Create New User and set token
  before((done) => {
    request
      .post('/api/users/mbSignup')
      .send(testUser)
      .end((err, res) => {
        testToken = res.body.token || null;
        expect(!!res.body.token).to.equal(true);
        done();
      });
  });

  // Delete New User
  after((done) => {
    request
    .post('/api/deletePost')
    .set('x-access-token', testToken)
    .send({postId: testPostId});

    request
    .post('/api/test/removeUser')
    .set('x-access-token', testToken)
    .send({username: testUser.username})
    .end(done);
  });

  describe('GET from /api/test', () => {
    it('returns "success"', (done) => {
      request
      .get('/api/test')
      .set('x-access-token', testToken)
      .expect('"success"', done);
    });
  });

  describe('POST from /api/test/findUser', () => {
    it('returns response', (done) => {
      request
      .post('/api/test/findUser')
      .set('x-access-token', testToken)
      .send({username: testUser.username})
      .end((err, res) => {
        expect(res.body.username).to.equal(testUser.username);
        done();
      });
    });
  });

  describe('Login from /api/users/mbLogin', () => {
    it('returns response', (done) => {
      request
      .post('/api/users/mbLogin')
      .set('x-access-token', testToken)
      .send({
        username: testUser.username,
        password: testUser.password
      })
      .end((err, res) => {
        expect(!!res.body.token).to.equal(true);
        expect(!!res.body.success).to.equal(true);
        done();
      });
    });
  });

  describe('Post to db from /api/postToDbp, Fetch and delete', () => {
    it('returns response', (done) => {
      request
      .post('/api/postToDb')
      .set('x-access-token', testToken)
      .send(testPost)
      .expect((res) => {
        expect(res.body.affectedRows).to.equal(1);
        testPostId = res.body.insertId;
      })
      .end(() => {
        request
        .post('/api/getPostFromPostId')
        .set('x-access-token', testToken)
        .send({postId: testPostId})
        .end((err, res) => {
          expect(res.body[0].body).to.equal(testPost.body);
          done();
        });
      });
    });
  });

});
