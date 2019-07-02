'use strict';
const { settings } = require('./test.settings');
const signnow = require('../lib/signnow')({
  credentials: settings.credentials,
  production: settings.production, // (false by defult)
});

(function() {

  describe('folder', () => {

    describe('.list()', () => {
      it('should return a list of folders', done => {
        signnow.folder.list({ token: settings.token }, (err, res) => {
          if (err) { throw err[0].message; }
          res.should.be.a('object');
          res.should.have.property('folders');
          done();
        });
      });
    });

    describe('.documents()', () => {
      it('should return all documents inside a folder', done => {
        signnow.folder.documents({
          token: settings.token,
          id: settings.folderid,
          filter: [
            { 'signing-status': 'pending' },
            { 'signing-status': 'waiting-for-me' },
          ],
          sort: { 'document-name': 'asc' },
        }, (err, res) => {
          if (err) { throw err[0].message; }
          res.should.be.a('object');
          res.should.have.property('documents');
          done();
        });
      });
    });


  });

})();
