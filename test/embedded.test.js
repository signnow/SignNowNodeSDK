'use strict';
const { settings } = require('./test.settings');
const signnow = require('../lib')({
  credentials: settings.credentials,
  production: settings.production, // (false by defult)
});

(function() {

  describe('embedded', () => {

    describe('.createInvite()', () => {
      it('should create a new embedded signing invites for a document without sending emails', done => {
        signnow.embedded.createInvite({
          document_id: settings.documentid,
          invites: [],
        }, (err, res) => {
          if (err) { throw err[0].message; }
          res.should.be.a('object');
          res.should.have.property('data');
          done();
        });
      });
    });

  });

})();
