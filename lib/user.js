'use strict';
const https = require('https');
const {
  responseHandler, errorHandler, buildRequestOptions,
} = require('./common');


/**
 * User Methods
 */

// create new user account
exports.create = function(obj, callback) {
  const JSONData = JSON.stringify(obj);

  const req = https.request(buildRequestOptions({
    method: 'POST',
    path: '/user',
    authorization: { type: 'Basic' },
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(JSONData),
    },
  }), responseHandler(callback));

  req.on('error', errorHandler(callback));
  req.write(JSONData);
  req.end();
};

// retrieve user account details
exports.retrieve = function(obj, callback) {
  const req = https.request(buildRequestOptions({
    method: 'GET',
    path: '/user',
    authorization: {
      type: 'Bearer',
      token: obj.token,
    },
  }), responseHandler(callback));

  req.on('error', errorHandler(callback));
  req.end();
};
