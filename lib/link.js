'use strict';
const https = require('https');
const {
  responseHandler, errorHandler, buildRequestOptions,
} = require('./common');
const { view } = require('./document');

/**
 * @type {function}
 * @param {DocumentViewParams} data - view document with field extract payload
 * @param {function(err: ApiErrorResponse, res: DocumentViewResponse)} [callback] - error first node.js callback
 */
const getDocumentDetails = view;

/**
 * Link methods
 */
class Link {

  /**
   * Create signing link payload
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
   * @param {function(err: ApiErrorResponse, res: SigningLinkCreateResponse)} [callback] - error first node.js callback
   */
  static create ({ document_id, token }, callback) {
    getDocumentDetails({
      id: document_id,
      token,
    }, (detailErr, detailRes) => {
      if (detailErr) {
        callback(detailErr);
        return;
      } else {
        const { routing_details } = detailRes;
        const documentHasAtLeastOneUnfixedRole = routing_details
          .map(routing => routing.data)
          .reduce((acc, i) => acc.concat(i), [])
          .some(role => role.default_email === '');

        if (documentHasAtLeastOneUnfixedRole) {
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
        } else {
          callback('A document must have at least one role that does not have a fixed e-mail to create an invite link.');
          return;
        }
      }
    });
  }
}

module.exports = Link;
