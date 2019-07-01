'use strict';
const { settings } = require('../test-settings');
const signnow = require('../lib/signnow')({
  credentials: settings.credentials,
  production: settings.production, // (false by defult)
});

(function() {

  describe('link', () => {

    describe('.create()', () => {
      it('should create a new signing link and return two urls', done => {
        signnow.webhook.create({ document_id: settings.documentid }, (err, res) => {
          if (err) { throw err[0].message; }
          res.should.be.a('object');
          res.should.have.property('url');
          done();
        });
      });
    });


  });

})();
