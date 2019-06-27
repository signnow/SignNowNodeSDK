'use strict';
const https = require('https');
const {
  settings, responseHandler, errorHandler,
} = require('./common');


/**
 * Link Methods
 */

// create webhook
exports.create = function(obj, callback) {
  settings.options.method = 'POST';
  settings.options.headers.Authorization = `Bearer ${obj.token}`;
  settings.options.path = `${settings.basePath}/link`;

  const JSONData = JSON.stringify({ document_id: obj.document_id });

  settings.options.headers['Content-Type'] = 'application/json';
  settings.options.headers['Content-Length'] = JSONData.length;

  const req = https.request(settings.options, responseHandler(callback));

  req.on('error', errorHandler(callback));
  req.write(JSONData);
  req.end();
};
