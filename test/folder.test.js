(function(){
  "use strict";

  var settings = require('../test-settings').settings;
  var cudasign = require('../lib/cudasign')({
        credentials: settings.credentials,
        production: false //(false by defult)
      }),
      should = require('chai').should();


  describe('folder', function(){

    describe('.list()', function(){
      it('should return a list of folders', function(done){
        cudasign.folder.list({
            "token": settings.token
        }, function(err, res){
            if (err) throw err[0].message;
            res.should.be.a('object');
            res.should.have.property("folders");
            done();
        });
      });
    });

    describe('.documents()', function(){
      it('should return all documents inside a folder', function(done){
        cudasign.folder.documents({
            "token": settings.token,
            "id": settings.folderid,
            "filter": [
              {"signing-status": "pending"},
              {"signing-status": "waiting-for-me"}
            ],
            "sort": {"document-name":"asc"}
        }, function(err, res){
            if (err) throw err[0].message;
            res.should.be.a("object");
            res.should.have.property("documents");
            done();
        });
      });
    });


  });

})();
