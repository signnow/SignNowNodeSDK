(function(){
  "use strict";

  var settings = require('../test-settings').settings;
  var cudasign = require('../lib/cudasign')({
        credentials: settings.credentials,
        production: settings.production //(false by defult)
      }),
      should = require('chai').should();


  describe('webhook', function(){

    describe('.list()', function(){
      it('should return a list of webhooks', function(done){
        cudasign.webhook.list({
            "token": settings.token
        }, function(err, res){
            if (err) throw err[0].message;
            res.should.be.a('object');
            res.should.have.property("subscriptions");
            done();
        });
      });
    });

    describe('.create()', function(){
      it('should create a new webhook and return an id', function(done){
        cudasign.webhook.create({
            "token": settings.token,
            "event": "document.create",
            "callback_url": "http://requestb.in/qwmphiqw"
        }, function(err, res){
            if (err) throw err[0].message;
            res.should.be.a("object");
            res.should.have.property("id");
            done();
        });
      });
    });


  });

})();
