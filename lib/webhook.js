'use strict';
const https = require('https');
const {
  responseHandler, errorHandler, buildRequestOptions,
} = require('./common');


/**
 * Webook Methods
 */

// list webhooks
exports.list = function(obj, callback) {
  const req = https.request(buildRequestOptions({
    method: 'GET',
    path: '/event_subscription',
    authorization: {
      type: 'Bearer',
      token: obj.token,
    },
  }), responseHandler(callback));

  req.on('error', errorHandler(callback));
  req.end();
};

// create webhook
exports.create = function(obj, callback) {
  const JSONData = JSON.stringify({
    event: obj.event,
    callback_url: obj.callback_url,
  });

  const req = https.request(buildRequestOptions({
    method: 'POST',
    path: '/event_subscription',
    authorization: {
      type: 'Bearer',
      token: obj.token,
    },
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(JSONData),
    },
  }), responseHandler(callback));

  req.on('error', errorHandler(callback));
  req.write(JSONData);
  req.end();
};
