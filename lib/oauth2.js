'use strict';
const https = require('https');
const querystring = require('querystring');
const { settings, responseHandler, errorHandler } = require('./common');

/**
 * OAuth2 Methods
 */

// request an access token for a user
exports.requestToken = function(obj, callback) {
  obj.grant_type = 'password';
  const data = querystring.stringify(obj).replace('%40', '@');

  settings.options.method = 'POST';
  settings.options.path = settings.basePath + '/oauth2/token';
  settings.options.headers.Authorization = 'Basic ' + settings.credentials;
  settings.options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  settings.options.headers['Content-Length'] = Buffer.byteLength(data);

  const req = https.request(settings.options, responseHandler(callback));

  req.on('error', errorHandler(callback));
  req.write(data);
  req.end();
};

// verify an access token for a user
exports.verify = function(obj, callback) {
  settings.options.method = 'GET';
  settings.options.path = settings.basePath + '/oauth2/token';
  settings.options.headers.Authorization = 'Bearer ' + obj.token;
  delete settings.options.headers['Content-Length'];

  const req = https.request(settings.options, responseHandler(callback));

  req.on('error', errorHandler(callback));
  req.end();
};
