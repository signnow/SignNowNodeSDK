'use strict';
const https = require('https');
const {
  responseHandler, errorHandler, buildRequestOptions,
} = require('./common');


/**
 * Template Methods
 */

// create a template by flattening an existing document.
exports.create = function(obj, callback) {
  const JSONData = JSON.stringify({
    document_id: obj.document_id,
    document_name: obj.document_name,
  });

  const req = https.request(buildRequestOptions({
    method: 'POST',
    path: '/template',
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

/*
 * create a new document by copying a flattened document. If a name is not supplied
 * than it will default to the original document's name.
 */

exports.duplicate = function(obj, callback) {
  const JSONData = JSON.stringify({
    template_id: obj.id,
    document_name: obj.name,
  });

  const req = https.request(buildRequestOptions({
    method: 'POST',
    path: `/template/${obj.id}/copy`,
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
