(function(){
  "use strict";

  var settings = require('../test-settings').settings;
  var cudasign = require('../lib/cudasign')({
        credentials: settings.credentials,
        production: settings.production //(false by defult)
      }),
      should = require('chai').should();


  describe('document', function(){

    describe('.list()', function(){
      it('should return a list of documents', function(done){
        this.timeout(10000);
        cudasign.document.list({
            "token": settings.token
        }, function(err, res){
            if (err) throw err[0].message;
            res.should.be.a('array');
            res[0].should.have.property("document_name");
            done();
        });
      });
    });

    describe('.view()', function(){
      it('should return a document resource', function(done){
        cudasign.document.view({
            "token": settings.token,
            "id": settings.documentid
        }, function(err, res){
            if (err) throw err[0].message;
            res.should.have.property("document_name");
            done();
        });
      });
    });

    describe('.download()', function(){
      it('should download a collapsed document', function(done){
        cudasign.document.download({
            "token": settings.token,
            "id": settings.documentid
        }, function(err, res){
            if (err) throw err[0].message;
            res.should.exist();
            done();
        });
      });
    });

    describe('.update()', function(){
      it('should update a document and return the document id', function(done){
        var fields = {
           "texts":[
              {
                 "size":8,
                 "x":61,
                 "y":72,
                 "page_number":0,
                 "font":"Arial",
                 "data":"sample text",
                 "line_height":9.075
              }
           ]
        };

        cudasign.document.update({
            "token": settings.token,
            "id": settings.documentid,
            "fields": fields
        }, function(err, res){
            if (err) throw err[0].message;
            res.should.have.property("id");
            done();
        });
      });
    });

    describe.skip('.invite()', function(){
      it('should send an invite to sign a document', function(done){
        cudasign.document.invite({
            "token": settings.token,
            "id": settings.documentid,
            "from": settings.email,
            "to": settings.testemail
        }, function(err, res){
            if (err) throw err[0].message;
            res.should.have.property("result","success");
            done();
        });
      });
    });

    describe('.cancelInvite()', function(){
      it('should cancel all invites to a document', function(done){
        cudasign.document.cancelInvite({
            "token": settings.token,
            "id": settings.documentid
        }, function(err, res){
            if (err) throw err[0].message;
            res.should.have.property("status","success");
            done();
        });
      });
    });

    describe('.share()', function(){
      it('should return a link to download the document', function(done){
        cudasign.document.share({
            "token": settings.token,
            "id": settings.documentid
        }, function(err, res){
            if (err) throw err[0].message;
            res.should.have.property("link");
            done();
        });
      });
    });

    describe.skip('.merge()', function(){
      it('should merge two documents and return the new document name', function(done){
        cudasign.document.merge({
            "token": settings.token,
            "name": "Mocha Unit Test",
            "document_ids": [
              "xxx",
              "xxx"
            ]
        }, function(err, res){
            if (err) throw err[0].message;
            res.should.have.property("name");
            res.should.have.property("document_ids");
            done();
        });
      });
    });

    describe.skip('.create()', function(){
      this.timeout(20000);
      it('should upload a file and create a new document', function(done){
        cudasign.document.create({
            "token": settings.token,
            "filepath": __dirname + "/test.doc"
        }, function(err, res){
            if (err) return done(err[0].message);
            res.should.have.property("id");
            done();
        });
      });
    });

    describe.skip('.extractfields()', function(){
      this.timeout(20000);
      it('should upload a file containing CudaSign field tags', function(done){
        cudasign.document.extractfields({
            "token": settings.token,
            "filepath": __dirname + "/test.doc"
        }, function(err, res){
            if (err) return done(err[0].message);
            res.should.have.property("id");
            done();
        });
      });
    });

    describe.skip('.history()', function(){
      it('should return the history of a document', function(done){
        cudasign.document.history({
            "token": settings.token,
            "id": settings.documentid
        }, function(err, res){
            if (err) return done(err[0].message);
            res.should.be.a('array');
            res[0].should.have.property("event");
            done();
        });
      });
    });

  });

})();
