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

  /**
   * Generate embedded invite link payload
   * @typedef {Object} EmbeddedGenerateLinkPayload
   * @property {string} token - Access token.
   * @property {string} document_id - ID of the requested document.
   * @property {string} field_invite_unique_id - ID of the signature invite you'd like to embed.
   * @property {number} link_expiration - In how many minutes the link expires, ranges from 15 to 45 minutes or null.
   * @property {string} auth_method - Signer authentication method.
   */

  /**
   * Response EmbeddedGeneratedLink
   * @typedef {Object} EmbeddedGeneratedLink
   * @property {string} link - Returns a link for embedded invite
   */

  /**
   * Generate a link for the embedded invite response data
   * @typedef {Object} EmbeddedGenerateLinkResponse
   * @property {EmbeddedGeneratedLink} data - Response data
   */

  /**
   * Generate a link for the embedded invite.
   * @param {EmbeddedGenerateLinkPayload} data - Generate embedded invite link payload
   * @param {function(err: ApiErrorResponse, res: EmbeddedGenerateLinkResponse)} [callback] - error first node.js callback
   */
  static generateInviteLink ({
    token, document_id, field_invite_unique_id, link_expiration, auth_method,
  }, callback) {
    const JSONData = JSON.stringify({
      link_expiration,
      auth_method,
    });
    const req = https
      .request(buildRequestOptions({
        method: 'POST',
        path: `/v2/documents/${document_id}/embedded-invites/${field_invite_unique_id}/link`,
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
