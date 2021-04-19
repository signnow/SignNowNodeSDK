'use strict';
const https = require('https');
const {
  responseHandler,
  errorHandler,
  buildRequestOptions,
} = require('../common');

/**
 * Embedded methods
 */
class Embedded {

  /**
   * Create embedded signing invite payload
   * @typedef {Object} EmbeddedSigningInvite
   * @property {string} email - Signer's email address
   * @property {number} role_id - Signer's role ID
   * @property {number} order - Order of signing. Cannot be 0
   * @property {string} auth_method - Signer authentication method. One of (password, email, mfa, social, biometric, other, none)
   */

  /**
   * Create embedded signing invites payload
   * @typedef {Object} EmbeddedCreateInvitesPayload
   * @property {string} token - Access token.
   * @property {string} document_id - ID of the requested document.
   * @property {EmbeddedSigningInvite[]} invites - Array of invites
   */

  /**
   * Response EmbeddedInvite
   * @typedef {Object} EmbeddedInvite
   * @property {string} id - ID of the sending invite
   * @property {string} email - Signer's email address
   * @property {number} role_id - Signer's role ID
   * @property {number} order - Order of signing
   * @property {string} status -  Status of the invite
   */

  /**
   * Create embedded signing invites response data
   * @typedef {Object} EmbeddedCreateInvitesResponse
   * @property {EmbeddedInvite[]} data - Array sending of invites
   */

  /**
   * Create embedded signing invites for a document without sending emails.
   * @param {EmbeddedCreateInvitesPayload} data - Create invites payload
   * @param {function(err: ApiErrorResponse, res: EmbeddedCreateInvitesResponse)} [callback] - error first node.js callback
   */
  static createInvite ({
    token, document_id, invites,
  }, callback) {
    const JSONData = JSON.stringify({ invites });
    const req = https
      .request(buildRequestOptions({
        method: 'POST',
        path: `/v2/documents/${document_id}/embedded-invites`,
        authorization: {
          type: 'Basic',
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

module.exports = Embedded;
