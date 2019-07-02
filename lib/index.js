'use strict';
const user = require('./user');
const document = require('./document');
const folder = require('./folder');
const webhook = require('./webhook');
const oauth2 = require('./oauth2');
const enumerations = require('./enumerations');
const template = require('./template');
const link = require('./link');
const {
  setProductionApiHost, setCredentials,
} = require('./common');

/**
 * Api client initialization params
 * @typedef {Object} InitParams
 * @property {string} credentials - base64 encoded basic API credentials
 * @property {boolean} [production=true] - production/eval API flag. If false uses eval
 */

/**
 * Api client features
 * @typedef {Object} Features
 * @property {User} user - user related methods
 */

/**
 * SignNow API client initialization
 * @param {InitParams} params - API client initialization params
 * @return {Features}
 */
module.exports = function init ({
  credentials,
  production = true,
}) {

  if (credentials) {
    setCredentials(credentials);
  }

  // toggle production
  if (production) {
    setProductionApiHost();
  }

  return {
    user,
    oauth2,
    document,
    webhook,
    folder,
    enumerations,
    template,
    link,
  };
};

/**
 * Api error object
 * @typedef {Object} ApiError
 * @property {number} code - error code
 * @property {string} message - error message
 */

/**
 * Api error response
 * @typedef {?(ApiError[]|ApiError|Error|string)} ApiErrorResponse
 */
