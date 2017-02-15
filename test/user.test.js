(function() {
    "use strict";

    var settings = require('../test-settings').settings;
    var signnow = require('../lib/signnow')({
            credentials: settings.credentials,
            production: settings.production //(false by defult)
        }),
        should = require('chai').should();

    //generate randon string
    function randString(x) {
        var s = "";
        while (s.length < x && x > 0) {
            var r = Math.random();
            s += (r < 0.1 ? Math.floor(r * 100) : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
        }
        return s;
    }

    describe('user', function() {

        describe('.create()', function() {
            it('should create a new user account', function(done) {
                var userObj = {
                    "first_name": "Unit" + randString(4),
                    "last_name": "Test" + randString(4),
                    "email": "unit.test" + randString(4) + "@domain.com",
                    "password": "MacBookPr0"
                };
                //console.log(userObj);
                signnow.user.create(userObj, function(err, res) {
                    if (err) throw err[0].message;
                    res.should.have.property("id");
                    done();
                });
            });
        });

        describe('.retrieve()', function() {
            it('should retrieve user resource', function(done) {
                signnow.user.retrieve({
                    "token": settings.token
                }, function(err, res) {
                    if (err) throw err[0].message;
                    res.should.have.property("first_name");
                    done();
                });
            });
        });

    });

})();