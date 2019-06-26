'use strict';
const https = require('https');
const { settings, responseHandler } = require('./common');


/**
 * User Methods
 */

// create new user account
exports.create = function(obj, callback) {
  settings.options.method = 'POST';
  settings.options.headers.Authorization = 'Basic ' + settings.credentials;
  settings.options.headers['content-type'] = 'application/json';
  settings.options.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(obj));
  settings.options.path = settings.basePath + '/user';

  const req = https.request(settings.options, responseHandler(callback));

  req.on('error', e => {
    if (callback) {
      return callback(e.message);
    }
  });

  req.write(JSON.stringify(obj));
  req.end();
};

// retrieve user account details
exports.retrieve = function(obj, callback) {
  settings.options.method = 'GET';
  settings.options.headers.Authorization = 'Bearer ' + obj.token;
  settings.options.path = settings.basePath + '/user';
  delete settings.options.headers['Content-Length'];

  const req = https.request(settings.options, responseHandler(callback));

  req.on('error', e => {
    if (callback) {
      return callback(e.message);
    }
  });

  req.end();
};
