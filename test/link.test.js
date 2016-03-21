(function(){
  "use strict";

  var settings = require('../test-settings').settings;
  var cudasign = require('../lib/cudasign')({
        credentials: settings.credentials,
        production: settings.production //(false by defult)
      }),
      should = require('chai').should();


  describe('link', function(){

    describe('.create()', function(){
      it('should create a new signing link and return two urls', function(done){
        cudasign.webhook.create({
            "document_id": settings.documentid
        }, function(err, res){
            if (err) throw err[0].message;
            res.should.be.a("object");
            res.should.have.property("url");
            done();
        });
      });
    });


  });

})();
