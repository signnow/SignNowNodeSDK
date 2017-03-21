(function() {
    "use strict";
    /**
     * OAuth2 Methods
     */

    var https = require('https'),
        querystring = require('querystring'),
        common = require('./common').settings;

    //request an access token for a user
    exports.requestToken = function(obj, callback) {
        obj.grant_type = "password";
        var data = querystring.stringify(obj).replace("%40", "@");

        common.options.method = "POST";
        common.options.path = common.basePath + "/oauth2/token";
        common.options.headers.Authorization = "Basic " + common.credentials;
        common.options.headers['Content-Type'] = "application/x-www-form-urlencoded";
        common.options.headers['Content-Length'] = Buffer.byteLength(data);

        var req = https.request(common.options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                chunk = JSON.parse(chunk);
                var errors = chunk.errors;
                if (callback) { return callback(errors, chunk); }
            });
        });

        req.on('error', function(e) {
            if (callback) {
                return callback(e.message);
            }
        });

        req.write(data);
        req.end();
    };

    //verify an access token for a user
    exports.verify = function(obj, callback) {
        common.options.method = "GET";
        common.options.path = common.basePath + "/oauth2/token";
        common.options.headers.Authorization = "Bearer " + obj.token;

        var req = https.request(common.options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                chunk = JSON.parse(chunk);
                var errors = chunk.errors;
                if (callback) { return callback(errors, chunk); }
            });
        });

        req.on('error', function(e) {
            if (callback) {
                return callback(e.message);
            }
        });

        req.end();
    };
})();