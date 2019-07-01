'use strict';
const https = require('https');
const {
  responseHandler, errorHandler, buildRequestOptions,
} = require('./common');


/**
 * Link Methods
 */

// create webhook
exports.create = function(obj, callback) {
  const JSONData = JSON.stringify({ document_id: obj.document_id });

  const req = https.request(buildRequestOptions({
    method: 'POST',
    path: '/link',
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
