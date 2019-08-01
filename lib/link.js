'use strict';
const https = require('https');
const {
  responseHandler, errorHandler, buildRequestOptions,
} = require('./common');

/**
 * Link methods
 */
class Link {

  /**
   * Create signing link for document
   * @typedef {Object} SigningLinkCreateParams
   * @property {string} document_id - id of specific document
   * @property {string} token - your auth token
   */

  /**
   * Create signing link response data
   * @typedef {Object} SigningLinkCreateResponse
   * @property {string} url - invite url with user authorization
   * @property {string} url_no_signup - invite url without user authorization
   */

  /**
   * Creates signing link for specified document
   * @param {SigningLinkCreateParams} data - create signing link payload
   * @param { function(err: ApiErrorResponse, res: SigningLinkCreateResponse) } [callback] - error first node.js callback
   */
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
