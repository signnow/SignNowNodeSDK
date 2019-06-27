'use strict';
const settings = require('../test-settings').settings;
const signnow = require('../lib/signnow')({
  credentials: settings.credentials,
  production: settings.production, // (false by defult)
});

(function() {

  describe('webhook', () => {

    describe('.list()', () => {
      it('should return a list of webhooks', done => {
        signnow.webhook.list({ token: settings.token }, (err, res) => {
          if (err) { throw err[0].message; }
          res.should.be.a('object');
          res.should.have.property('subscriptions');
          done();
        });
      });
    });

    describe('.create()', () => {
      it('should create a new webhook and return an id', done => {
        signnow.webhook.create({
          token: settings.token,
          event: 'document.create',
          callback_url: 'http://requestb.in/qwmphiqw',
        }, (err, res) => {
          if (err) { throw err[0].message; }
          res.should.be.a('object');
          res.should.have.property('id');
          done();
        });
      });
    });


  });

})();
