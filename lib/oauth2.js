'use strict';
const https = require('https');
const querystring = require('querystring');
const {
  responseHandler, errorHandler, buildRequestOptions,
} = require('./common');

/**
 * OAuth2 methods
 */
class OAuth2 {

  /**
   * Request access token payload
   * @typedef {Object} AccessTokenGetParams
   * @property {string} username - email of a user
   * @property {string} password - password of a user
   */

  /**
   * Request access token response data
   * @typedef {Object} AccessTokenGetResponse
   * @property {number} res.expires_in - time in seconds for which the token was issued
   * @property {string} res.token_type - type of access token (e.g. 'bearer')
   * @property {string} res.access_token - access token
   * @property {string} res.refresh_token - refresh token
   * @property {string} res.scope - access scopes
   */

  /**
   * Request access token for a user
   * @param {AccessTokenGetParams} data - access token reques payload
   * @param {function(err: ApiErrorResponse, res: AccessTokenGetResponse)} [callback] - error first node.js callback
   */
  static requestToken (data, callback) {
    const dataCopy = Object.assign({}, data, { grant_type: 'password' });
    const dataStringified = querystring.stringify(dataCopy).replace('%40', '@');
    const req = https
      .request(buildRequestOptions({
        method: 'POST',
        path: '/oauth2/token',
        authorization: { type: 'Basic' },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(dataStringified),
        },
      }), responseHandler(callback))
      .on('error', errorHandler(callback));

    req.write(dataStringified);
    req.end();
  }

  /**
   * Verify access token payload
   * @typedef {Object} AccessTokenVerifyParams
   * @property {string} token - your auth token
   */

  /**
   * Verify access token response data
   * @typedef {Object} AccessTokenVerifyResponse
   * @property {number} res.expires_in - time in seconds for which the token was issued
   * @property {string} res.token_type - type of access token (e.g. 'bearer')
   * @property {string} res.access_token - access token
   * @property {string} res.scope - access scopes
   */

  /**
   * Verify access token
   * @param {AccessTokenVerifyParams} data - access token request payload
   * @param {function(err: ApiErrorResponse, res: AccessTokenVerifyResponse)} [callback] - error first node.js callback
   */
  static verify ({ token }, callback) {
    https
      .request(buildRequestOptions({
        method: 'GET',
        path: '/oauth2/token',
        authorization: {
          type: 'Bearer',
          token,
        },
      }), responseHandler(callback))
      .on('error', errorHandler(callback))
      .end();
  }

}

module.exports = OAuth2;
