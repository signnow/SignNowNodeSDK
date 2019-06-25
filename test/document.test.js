'use strict';
const settings = require('../test-settings').settings;
const signnow = require('../lib/signnow')({
  credentials: settings.credentials,
  production: settings.production, // (false by defult)
});

(function() {

  describe('document', () => {

    describe('.list()', () => {
      it('should return a list of documents', done => {
        signnow.document.list({
          'token': settings.token,
        }, (err, res) => {
          if (err) {throw err[0].message;}
          res.should.be.a('array');
          res[0].should.have.property('document_name');
          done();
        });
      }).timeout(10000);
    });

    describe('.view()', () => {
      it('should return a document resource', done => {
        signnow.document.view({
          'token': settings.token,
          'id': settings.documentid,
        }, (err, res) => {
          if (err) {throw err[0].message;}
          res.should.have.property('document_name');
          done();
        });
      });
    });

    describe('.download()', () => {
      it('should download a collapsed document', done => {
        signnow.document.download({
          'token': settings.token,
          'id': settings.documentid,
        }, (err, res) => {
          if (err) {throw err[0].message;}
          res.should.exist();
          done();
        });
      });
    });

    describe('.update()', () => {
      it('should update a document and return the document id', done => {
        const fields = {
          'texts': [{
            'size': 8,
            'x': 61,
            'y': 72,
            'page_number': 0,
            'font': 'Arial',
            'data': 'sample text',
            'line_height': 9.075,
          }],
        };

        signnow.document.update({
          'token': settings.token,
          'id': settings.documentid,
          'fields': fields,
        }, (err, res) => {
          if (err) {throw err[0].message;}
          res.should.have.property('id');
          done();
        });
      });
    });

    describe.skip('.invite()', () => {
      it('should send an invite to sign a document', done => {
        signnow.document.invite({
          'token': settings.token,
          'id': settings.documentid,
          'from': settings.email,
          'to': settings.testemail,
        }, (err, res) => {
          if (err) {throw err[0].message;}
          res.should.have.property('result', 'success');
          done();
        });
      });
    });

    describe('.cancelInvite()', () => {
      it('should cancel all invites to a document', done => {
        signnow.document.cancelInvite({
          'token': settings.token,
          'id': settings.documentid,
        }, (err, res) => {
          if (err) {throw err[0].message;}
          res.should.have.property('status', 'success');
          done();
        });
      });
    });

    describe('.share()', () => {
      it('should return a link to download the document', done => {
        signnow.document.share({
          'token': settings.token,
          'id': settings.documentid,
        }, (err, res) => {
          if (err) {throw err[0].message;}
          res.should.have.property('link');
          done();
        });
      });
    });

    describe.skip('.merge()', () => {
      it('should merge two documents and return the new document name', done => {
        signnow.document.merge({
          'token': settings.token,
          'name': 'Mocha Unit Test',
          'document_ids': [
            'xxx',
            'xxx',
          ],
        }, (err, res) => {
          if (err) {throw err[0].message;}
          res.should.have.property('name');
          res.should.have.property('document_ids');
          done();
        });
      });
    });

    describe.skip('.create()', () => {
      it('should upload a file and create a new document', done => {
        signnow.document.create({
          'token': settings.token,
          'filepath': __dirname + '/test.doc',
        }, (err, res) => {
          if (err) {return done(err[0].message);}
          res.should.have.property('id');
          done();
        });
      }).timeout(20000);
    });

    describe.skip('.extractfields()', () => {
      it('should upload a file containing SignNow field tags', done => {
        signnow.document.extractfields({
          'token': settings.token,
          'filepath': __dirname + '/test.doc',
        }, (err, res) => {
          if (err) {return done(err[0].message);}
          res.should.have.property('id');
          done();
        });
      }).timeout(20000);
    });

    describe.skip('.history()', () => {
      it('should return the history of a document', done => {
        signnow.document.history({
          'token': settings.token,
          'id': settings.documentid,
        }, (err, res) => {
          if (err) {return done(err[0].message);}
          res.should.be.a('array');
          res[0].should.have.property('event');
          done();
        });
      });
    });

  });

})();
