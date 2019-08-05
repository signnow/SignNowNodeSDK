'use strict';
const https = require('https');
const {
  responseHandler, errorHandler, buildRequestOptions,
} = require('./common');


/**
 * Document Group methods
 */
class DocumentGroup {

  /**
   * Create document group payload
   * @typedef {Object} DocumentGroupCreateParams
   * @property {string} token - your auth token
   * @property {string[]} document_ids - array of document ids for document group creation
   * @property {string} group_name - new name of document group
   */

  /**
   * Create document group response data
   * @typedef {Object} DocumentGroupCreateResponse
   * @property {string} id - document group unique id
   */

  /**
   * Create new document group
   * @param {DocumentGroupCreateParams} data - create document group payload
   * @param {function(err: ApiErrorResponse, res: DocumentGroupCreateResponse)} [callback] - error first node.js callback
   */
  static create ({
    token,
    document_ids,
    group_name,
  }, callback) {
    const JSONData = JSON.stringify({
      document_ids,
      group_name,
    });
    const req = https
      .request(buildRequestOptions({
        method: 'POST',
        path: '/documentgroup',
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


module.exports = DocumentGroup;
