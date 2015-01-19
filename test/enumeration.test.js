(function(){
  "use strict";

  var settings = require('../test-settings').settings;
  var signnow = require('../lib/signnow')({
        credentials: settings.credentials,
        production: false //(false by defult)
      }),
      should = require('chai').should();


  describe('enumerations', function(){

    describe('.addField()', function(){
      it('should add an enumeration field(drop down) to a document and return the document id', function(done){
        signnow.enumerations.addField({
            "token": settings.token,
            "document_id": settings.documentid,
            "x":150,
            "y":200,
            "width":200,
            "height":50,
            "page_number":0,
            "role":"buyer",
            "required":true,
            "label":"Clothing Brand"
        }, function(err, res){
            if (err) throw err[0].message;
            res.should.have.property("id");
            done();
        });
      });
    });

    describe('.addOptions()', function(){
      var fieldId = "";
      before(function(done){
        signnow.enumerations.addField({
            "token": settings.token,
            "document_id": settings.documentid,
            "x":150,
            "y":200,
            "width":200,
            "height":50,
            "page_number":0,
            "role":"buyer",
            "required":true,
            "label":"Clothing Brand"
        }, function(err, res){
            if (err) throw err[0].message;
            fieldId = res.id;
            done();
        });
      });
      it('should add enumeration options to the field we just created and return an array', function(done){
        signnow.enumerations.addOptions({
          "token": settings.token,
          "enumeration_options":[
             {
                "enumeration_id":fieldId,
                "data":"Active"
             },
             {
                "enumeration_id":fieldId,
                "data":"Old Navy"
             },
             {
                "enumeration_id":fieldId,
                "data":"Volcom"
             }
          ]
        }, function(err, res){
            if (err) throw err[0].message;
            res.should.be.a('array');
            done();
        });
      });
    });

  });

})();
