'use strict';
const { settings } = require('./test.settings');
const signnow = require('../lib')({
  credentials: settings.credentials,
  production: settings.production, // (false by default)
});

(function() {

  describe('embedded', () => {

    describe.skip('.createInvite()', () => {
      it('should create a new embedded signing invites for a document without sending emails', done => {
        signnow.embedded.createInvite({
          token: settings.token,
          document_id: settings.documentid,
          invites: [settings.documentInvite],
        }, (err, res) => {
          if (err) { throw err[0].message; }
          res.should.be.a('object');
          res.should.have.property('data');
          done();
        });
      });
    });

    describe.skip('.generateInviteLink()', () => {
      it('should create a link for the embedded invite.', done => {
        signnow.embedded.generateInviteLink({
          token: settings.token,
          document_id: settings.documentid,
          field_invite_unique_id: settings.fieldInviteUniqueId,
          link_expiration: 15,
          auth_method: 'password',
        }, (err, res) => {
          if (err) { throw err[0].message; }
          res.should.be.a('object');
          res.should.have.property('data');
          done();
        });
      });
    });

    describe.skip('.cancelInvites()', () => {
      it('should delete embedded invites for a document.', done => {
        signnow.embedded.cancelInvites({
          token: settings.token,
          document_id: settings.documentid,
        }, (err, res) => {
          if (err) { throw err[0].message; }
          res.should.be.a('object');
          res.should.have.property('status');
          done();
        });
      });
    });

  });

})();
