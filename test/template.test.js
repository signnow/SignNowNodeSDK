'use strict';
const { settings } = require('../test-settings');
const signnow = require('../lib/signnow')({
  credentials: settings.credentials,
  production: settings.production, // (false by defult)
});

(function() {

  describe('template', () => {

    describe.skip('.create()', () => {
      it('should create a template by flattening an existing document and return the template id', done => {
        signnow.template.create({
          token: settings.token,
          document_id: settings.documentid,
          document_name: 'Mocha Unit Test Template',
        }, (err, res) => {
          if (err) { throw err[0].message; }
          res.should.have.property('id');
          done();
        });
      });
    });

    describe.skip('.create()', () => {
      it('should create a template by flattening an existing document and return the template id', done => {
        signnow.template.create({
          token: settings.token,
          document_id: settings.templateid,
          document_name: 'Mocha Unit Test Duplicate Template',
        }, (err, res) => {
          if (err) { throw err[0].message; }
          res.should.have.property('id');
          done();
        });
      });
    });

  });

})();
