'use strict';
const https = require('https');
const querystring = require('querystring');
const common = require('./common').settings;

(function() {

  /**
     * OAuth2 Methods
     */

  //request an access token for a user
  exports.requestToken = function(obj, callback) {
    obj.grant_type = 'password';
    const data = querystring.stringify(obj).replace('%40', '@');

    common.options.method = 'POST';
    common.options.path = common.basePath + '/oauth2/token';
    common.options.headers.Authorization = 'Basic ' + common.credentials;
    common.options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    common.options.headers['Content-Length'] = Buffer.byteLength(data);

    const req = https.request(common.options, res => {
      let resData = '';

      res.setEncoding('utf8');

      res.on('data', chunk => {
        resData += chunk;
      });

      res.on('end', () => {
        let parsedData = '';
        let errors = '';
                
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

    req.on('error', e => {
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

    const req = https.request(common.options, res => {
      let data = '';

      res.setEncoding('utf8');

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        let parsedData = '';
        let errors = '';
                
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

    req.on('error', e => {
      if (callback) {
        return callback(e.message);
      }
    });

    req.end();
  };
})();
