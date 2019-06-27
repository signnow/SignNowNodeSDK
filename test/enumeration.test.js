'use strict';
const settings = require('../test-settings').settings;
const signnow = require('../lib/signnow')({
  credentials: settings.credentials,
  production: settings.production, // (false by defult)
});

(function() {

  describe('enumerations', () => {

    describe('.addField()', () => {
      it('should add an enumeration field(drop down) to a document and return the document id', done => {
        signnow.enumerations.addField({
          token: settings.token,
          document_id: settings.documentid,
          x: 150,
          y: 200,
          width: 200,
          height: 50,
          page_number: 0,
          role: 'buyer',
          required: true,
          label: 'Clothing Brand',
        }, (err, res) => {
          if (err) { throw err[0].message; }
          res.should.have.property('id');
          done();
        });
      });
    });

    describe('.addOptions()', () => {
      let fieldId = '';
      before(done => {
        signnow.enumerations.addField({
          token: settings.token,
          document_id: settings.documentid,
          x: 150,
          y: 200,
          width: 200,
          height: 50,
          page_number: 0,
          role: 'buyer',
          required: true,
          label: 'Clothing Brand',
        }, (err, res) => {
          if (err) { throw err[0].message; }
          fieldId = res.id;
          done();
        });
      });
      it('should add enumeration options to the field we just created and return an array', done => {
        signnow.enumerations.addOptions({
          token: settings.token,
          enumeration_options: [
            {
              enumeration_id: fieldId,
              data: 'Active',
            },
            {
              enumeration_id: fieldId,
              data: 'Old Navy',
            },
            {
              enumeration_id: fieldId,
              data: 'Volcom',
            },
          ],
        }, (err, res) => {
          if (err) { throw err[0].message; }
          res.should.be.a('array');
          done();
        });
      });
    });

  });

})();
