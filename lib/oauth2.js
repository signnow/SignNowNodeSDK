(function() {
  'use strict';
  /**
     * OAuth2 Methods
     */

  var https = require('https'),
    querystring = require('querystring'),
    common = require('./common').settings;

  //request an access token for a user
  exports.requestToken = function(obj, callback) {
    obj.grant_type = 'password';
    var data = querystring.stringify(obj).replace('%40', '@');

    common.options.method = 'POST';
    common.options.path = common.basePath + '/oauth2/token';
    common.options.headers.Authorization = 'Basic ' + common.credentials;
    common.options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    common.options.headers['Content-Length'] = Buffer.byteLength(data);

    var req = https.request(common.options, function(res) {
      var resData = '';

      res.setEncoding('utf8');

      res.on('data', function(chunk) {
        resData += chunk;
      });

      res.on('end', function() {
        var parsedData = '';
        var errors = '';
                
        try {
          parsedData = JSON.parse(resData);
          errors = parsedData.errors || null;
        } catch (e) {
          errors = e;
          parsedData = null;
        }
                
        if (callback) {
          return callback(errors, parsedData || resData);
        }
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
    common.options.method = 'GET';
    common.options.path = common.basePath + '/oauth2/token';
    common.options.headers.Authorization = 'Bearer ' + obj.token;
    delete common.options.headers['Content-Length'];

    var req = https.request(common.options, function(res) {
      var data = '';

      res.setEncoding('utf8');

      res.on('data', function(chunk) {
        data += chunk;
      });

      res.on('end', function() {
        var parsedData = '';
        var errors = '';
                
        try {
          parsedData = JSON.parse(data);
          errors = parsedData.errors || null;
        } catch (e) {
          errors = e;
          parsedData = null;
        }
                
        if (callback) {
          return callback(errors, parsedData || data);
        }
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
