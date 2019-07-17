'use strict';
const https = require('https');
const querystring = require('querystring');
const {
  responseHandler, errorHandler, buildRequestOptions,
} = require('./common');

/**
 * OAuth2 Methods
 */

// request an access token for a user
exports.requestToken = function(obj, callback) {
  obj.grant_type = 'password';
  const data = querystring.stringify(obj).replace('%40', '@');

  const req = https.request(buildRequestOptions({
    method: 'POST',
    path: '/oauth2/token',
    authorization: { type: 'Basic' },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data),
    },
  }), responseHandler(callback));

  req.on('error', errorHandler(callback));
  req.write(data);
  req.end();
};

// verify an access token for a user
exports.verify = function(obj, callback) {
  const req = https.request(buildRequestOptions({
    method: 'GET',
    path: '/oauth2/token',
    authorization: {
      type: 'Bearer',
      token: obj.token,
    },
  }), responseHandler(callback));

  req.on('error', errorHandler(callback));
  req.end();
};
