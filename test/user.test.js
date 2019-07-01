'use strict';
const { settings } = require('../test-settings');
const signnow = require('../lib/signnow')({
  credentials: settings.credentials,
  production: settings.production, // (false by defult)
});

(function() {

  // generate random string
  function randString (x) {
    let s = '';
    while (s.length < x && x > 0) {
      const r = Math.random();
      s += (r < 0.1 ? Math.floor(r * 100) : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
    }
    return s;
  }

  describe('user', () => {

    describe('.create()', () => {
      it('should create a new user account', done => {
        const userObj = {
          first_name: `Unit${randString(4)}`,
          last_name: `Test${randString(4)}`,
          email: `unit.test${randString(4)}@domain.com`,
          password: 'MacBookPr0',
        };

        // console.log(userObj);
        signnow.user.create(userObj, (err, res) => {
          if (err) { throw err[0].message; }
          res.should.have.property('id');
          done();
        });
      });
    });

    describe('.retrieve()', () => {
      it('should retrieve user resource', done => {
        signnow.user.retrieve({ token: settings.token }, (err, res) => {
          if (err) { throw err[0].message; }
          res.should.have.property('first_name');
          done();
        });
      });
    });

  });

})();
