'use strict';
const https = require('https');
const common = require('./common').settings;

(function() {

  /**
     * User Methods
     */

  //create new user account
  exports.create = function(obj, callback) {
    common.options.method = 'POST';
    common.options.headers.Authorization = 'Basic ' + common.credentials;
    common.options.headers['content-type'] = 'application/json';
    common.options.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(obj));
    common.options.path = common.basePath + '/user';

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
          errors = parsedData.message || null;
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

    req.write(JSON.stringify(obj));
    req.end();
  };

  //retrieve user account details
  exports.retrieve = function(obj, callback) {
    common.options.method = 'GET';
    common.options.headers.Authorization = 'Bearer ' + obj.token;
    common.options.path = common.basePath + '/user';

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
          errors = parsedData.message || null;
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
