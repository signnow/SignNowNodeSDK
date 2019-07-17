'use strict';
const https = require('https');
const {
  responseHandler, errorHandler, buildRequestOptions,
} = require('./common');


/**
 * Link methods
 */
class Link {

  // create signing link
  static create ({ document_id, token }, callback) {
    const JSONData = JSON.stringify({ document_id });
    const req = https
      .request(buildRequestOptions({
        method: 'POST',
        path: '/link',
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

module.exports = Link;
