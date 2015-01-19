(function(){
  "use strict";

  var settings = require('../test-settings').settings;
  var signnow = require('../lib/signnow')({
        credentials: settings.credentials,
        production: false //(false by defult)
      }),
      should = require('chai').should();


  describe('oauth2', function(){

    describe('.requestToken()', function(){
      it('should return an access token', function(done){
        signnow.oauth2.requestToken({
            "username": settings.username,
            "password": settings.password
        }, function(err, res){
            if (err) throw err[0].message;
            res.should.have.property("access_token");
            done();
        });
      });
    });

    describe('.verify()', function(){
      it('should return a verified access token', function(done){
        signnow.oauth2.verify({
            "token": settings.token
        }, function(err, res){
            if (err) throw err[0].message;
            res.should.have.property("access_token");
            done();
        });
      });
    });

  });

})();
