(function(){
  "use strict";

  var settings = require('../test-settings').settings;
  var cudasign = require('../lib/cudasign')({
        credentials: settings.credentials,
        production: settings.production //(false by defult)
      }),
      should = require('chai').should();


  describe('oauth2', function(){

    describe('.requestToken()', function(){
      it('should return an access token', function(done){
        cudasign.oauth2.requestToken({
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
        cudasign.oauth2.verify({
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
