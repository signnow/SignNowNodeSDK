'use strict';
const https = require('https');
const {
  responseHandler,
  errorHandler,
  buildRequestOptions,
} = require('../common');

/**
 * User methods
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
   * @property {string} id - user unique id
   * @property {number} verified - user is verified or not
   * @property {string} email - user email
   */

  /**
   * Create new user account
   * @param {UserCreateParams} data - create user payload
   * @param {function(err: ApiErrorResponse, res: UserCreateResponse)} [callback] - error first node.js callback
   */
  static create (data, callback) {
    const JSONData = JSON.stringify(data);
    const req = https
      .request(buildRequestOptions({
        method: 'POST',
        path: '/user',
        authorization: { type: 'Basic' },
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
   * Get user payload
   * @typedef {Object} UserGetParams
   * @property {string} token - your auth token
   */

  /**
   * Retrieve user response data
   * @typedef {Object} UserGetResponse
   * @property {string} id - user unique id
   * @property {string} first_name - first name
   * @property {string} last_name - last name
   * @property {number} active - user is active or not
   * @property {string} created - user creation timestamp
   * @property {string[]} emails - user emails
   * @property {string} primary_email - user primary email
   * @property {Object[]} subscriptions - user subscriptions data
   * @property {?Object} cloud_export_account_details - cloud export account details data
   * @property {boolean} is_logged_in - user is logged in or not
   * @property {{start_date: string, end_date: string, start_timestamp: number, end_timestamp: number}} billing_period - user billing period data
   * @property {Object[]} companies - companies where user is a member of
   * @property {?string} registration_source - resource where user was registered
   * @property {Object[]} teams - teams where user is a member of
   * @property {Object} settings - user specific settings
   * @property {Object[]} organization_settings - organization specific settings where user is a member of
   * @property {Object[]} merchant_accounts - merchant accounts data
   */

  /**
   * Retrieve user account details
   * @param {UserGetParams} data - get user payload
   * @param {function(err: ApiErrorResponse, res: UserGetResponse)} [callback] - error first node.js callback
   */
  static retrieve ({ token }, callback) {
    https
      .request(buildRequestOptions({
        method: 'GET',
        path: '/user',
        authorization: {
          type: 'Bearer',
          token,
        },
      }), responseHandler(callback))
      .on('error', errorHandler(callback))
      .end();
  }

  /**
   * Verify user email payload
   * @typedef {Object} UserVerifyEmailParams
   * @property {string} email - email to verify
   */

  /**
   * Verify user email response data
   * @typedef {Object} UserVerifyEmailResponse
   * @property {string} status - status of verification email sending, e.g. 'success'
   */

  /**
   * Sends email with verification link to user
   * @param {UserVerifyEmailParams} data - user verify email payload
   * @param {function(err: ApiErrorResponse, res: UserVerifyEmailResponse)} [callback] - error first node.js callback
   */
  static verifyEmail ({ email }, callback) {
    const JSONData = JSON.stringify({ email });
    const req = https
      .request(buildRequestOptions({
        method: 'POST',
        path: '/user/verifyemail',
        authorization: { type: 'Basic' },
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(JSONData),
          'User-Agent': getUserAgent(),
        },
      }), responseHandler(callback))
      .on('error', errorHandler(callback));

    req.write(JSONData);
    req.end();
  }
}

module.exports = User;
