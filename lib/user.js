'use strict';
const https = require('https');
const {
  responseHandler, errorHandler, buildRequestOptions,
} = require('./common');

/**
 * User Methods
 */
class User {

  /**
   * Create user payload
   * @typedef {Object} UserCreateParams
   * @property {string} email - email of new user
   * @property {string} password - password for new user
   * @property {string} [first_name] - first name of new user
   * @property {string} [last_name] - last name of new user
   */

  /**
   * Create user response data
   * @typedef {Object} UserCreateResponse
   */

  /**
   * Create new user account
   * @param {UserCreateParams} data - create user payload
   * @param {function(err: ApiErrorResponse, res: UserCreateResponse)} [callback] - error first node.js callback
   */
  static create (data, callback) {
    const JSONData = JSON.stringify(data);

    const req = https.request(buildRequestOptions({
      method: 'POST',
      path: '/user',
      authorization: { type: 'Basic' },
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSONData),
      },
    }), responseHandler(callback));

    req.on('error', errorHandler(callback));
    req.write(JSONData);
    req.end();
  }

  /**
   * Get user payload
   * @typedef {Object} UserGetParams
   * @property {string} token - your auth token
   */

  /**
   * Retrieve user response data
   * @typedef {Object} UserGetResponse
   */

  /**
   * Retrieve user account details
   * @param {UserGetParams} data - get user payload
   * @param {function(err: ApiErrorResponse, res: UserGetResponse)} [callback] - error first node.js callback
   */
  static retrieve ({ token }, callback) {
    const req = https.request(buildRequestOptions({
      method: 'GET',
      path: '/user',
      authorization: {
        type: 'Bearer',
        token,
      },
    }), responseHandler(callback));

    req.on('error', errorHandler(callback));
    req.end();
  }

}

module.exports = User;
