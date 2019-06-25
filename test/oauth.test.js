'use strict';
const settings = require('../test-settings').settings;
const signnow = require('../lib/signnow')({
  credentials: settings.credentials,
  production: settings.production, // (false by defult)
});

(function() {

  describe('oauth2', () => {

    describe('.requestToken()', () => {
      it('should return an access token', done => {
        signnow.oauth2.requestToken({
          'username': settings.username,
          'password': settings.password,
        }, (err, res) => {
          if (err) {throw err[0].message;}
          res.should.have.property('access_token');
          done();
        });
      });
    });

    describe('.verify()', () => {
      it('should return a verified access token', done => {
        signnow.oauth2.verify({
          'token': settings.token,
        }, (err, res) => {
          if (err) {throw err[0].message;}
          res.should.have.property('access_token');
          done();
        });
      });
    });

  });

})();
