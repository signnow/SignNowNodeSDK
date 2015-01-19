(function(){
  "use strict";

  var settings = require('../test-settings').settings;
  var signnow = require('../lib/signnow')({
        credentials: settings.credentials,
        production: false //(false by defult)
      }),
      should = require('chai').should();


  describe('template', function(){

    describe.skip('.create()', function(){
      it('should create a template by flattening an existing document and return the template id', function(done){
        signnow.template.create({
            token: settings.token,
            document_id: settings.documentid,
            document_name:"Mocha Unit Test Template"
        }, function(err, res){
            if (err) throw err[0].message;
            res.should.have.property("id");
            done();
        });
      });
    });

    describe.skip('.create()', function(){
      it('should create a template by flattening an existing document and return the template id', function(done){
        signnow.template.create({
            token: settings.token,
            document_id: settings.templateid,
            document_name:"Mocha Unit Test Duplicate Template"
        }, function(err, res){
            if (err) throw err[0].message;
            res.should.have.property("id");
            done();
        });
      });
    });

  });

})();
