'use strict';
const https = require('https');
const {
  responseHandler, errorHandler, buildRequestOptions,
} = require('./common');


/**
 * Webook methods
 */
class Webhook {

  // list webhooks
  static list ({ token }, callback) {
    https
      .request(buildRequestOptions({
        method: 'GET',
        path: '/event_subscription',
        authorization: {
          type: 'Bearer',
          token,
        },
      }), responseHandler(callback))
      .on('error', errorHandler(callback))
      .end();
  }

  // create webhook
  static create ({
    event,
    callback_url,
    token,
  }, callback) {
    const JSONData = JSON.stringify({
      event,
      callback_url,
    });

    const req = https
      .request(buildRequestOptions({
        method: 'POST',
        path: '/event_subscription',
        authorization: {
          type: 'Bearer',
          token,
        },
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(JSONData),
        },
      }), responseHandler(callback))
      .on('error', errorHandler(callback));

    req.write(JSONData);
    req.end();
  }

}

module.exports = Webhook;
