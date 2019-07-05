'use strict';
const https = require('https');
const {
  responseHandler, errorHandler, buildRequestOptions,
} = require('./common');


/**
 * Template methods
 */
class Template {

  // create a template by flattening an existing document.
  static create ({
    document_id,
    document_name,
    token,
  }, callback) {
    const JSONData = JSON.stringify({
      document_id,
      document_name,
    });

    const req = https
      .request(buildRequestOptions({
        method: 'POST',
        path: '/template',
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

  /*
   * create a new document by copying a flattened document. If a name is not supplied
   * than it will default to the original document's name.
   */
  static duplicate ({
    id: template_id,
    name: document_name,
    token,
  }, callback) {
    const JSONData = JSON.stringify({
      template_id,
      document_name,
    });

    const req = https
      .request(buildRequestOptions({
        method: 'POST',
        path: `/template/${template_id}/copy`,
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

module.exports = Template;
