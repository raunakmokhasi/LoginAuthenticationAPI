const request = require('supertest');
const app = require('./index');
const { header } = require('express-validator');
const expect = require('chai').expect;


describe('Signup Function Test', function() {
    it('The test should PASS if the SIGNUP Credentials are valid but USER ALREADY EXISTS', function(done) {
        request(app)
           .post('/signup')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send({ username: 'test', email: 'test@test.com', password: 'test123' })
           .expect(400)   //Test for Bad Response 500 - User already exists
           .end(done);
    }); 
});

describe('Login Function Test', function() {
    it('The test should PASS if the Login credentials are valid', function(done) {
        request(app)
           .post('/login')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send({ email: 'test@test.com', password: 'test123' })
           .expect(200)   //Test for Response OK Code - 200
           .expect('Content-Type', /json/) //Test for Content Type - application/json
           .expect(function(response) {    //Tests to check Response Body
              expect(response.body).not.to.be.empty; 
              expect(response.body).to.be.an('object');
           })
           .end(done);
    }); 

    it('The test should PASS if the Login credentials are invalid and the User does not exist', function(done) {
        request(app)
           .post('/login')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send({ email: 'test98765@test.com', password: 'test12399' })
           .expect(400)  //Test for Response 500 Bad Request - User does not existS
           .end(done);
    }); 

});


describe('Get User Info Test', function() {
    it('The test should PASS if the User Info i.e Token is valid and retrieved successfully', function(done) {
        request(app)
            .get('/getUserInfo')    
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWVmMzAzMGU0ODI4NWEzOGUwZTkyZDhhIn0sImlhdCI6MTU5Mjk4NjQxNywiZXhwIjoxNTkyOTkwMDE3fQ.1qZPrwvjwvMGQmsYFE2h6onkjEN-olRAvyFG0ZNCCbo')
            .expect(200)   //Test for Response OK Code - 200
            .expect('Content-Type', /json/) //Test for Content Type - application/json
            .expect(function(response) {    //Tests to check Response Body
              expect(response.body).not.to.be.empty; 
              expect(response.body).to.be.an('object');
           })
           .end(done);
    }); 

    it('The test should PASS if the User Info is invalid and returns an invalid token error', function(done) {
        request(app)
            .get('/getUserInfo')    
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('token', 'JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWVmMzAzMGU0ODI4NWEzOGUwZTkyZDhhIn0sImlhdCI6MTU5Mjk4NjQxNywiZXhwIjoxNTkyOTkwMDE3fQ.1qZPrwvjwvMGQmsYFE2h6onkjEN-olRAvyFG0ZNCCbo')
            .expect(500)  //Test for INVALID TOKEN (Server Error)
            .end(done);
    });

});
