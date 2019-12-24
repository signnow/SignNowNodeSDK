'use strict';
const user = require('./user');
const document = require('./document');
const folder = require('./folder');
const webhook = require('./webhook');
const oauth2 = require('./oauth2');
const enumerations = require('./enumerations');
const template = require('./template');
const link = require('./link');
const documentGroup = require('./document-group');
const documentGroupTemplate = require('./document-group-template');
const { setCredentials } = require('./common');
const { setEnvConfig } = require('../config');

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
 * @property {OAuth2} oauth2 - authentication related methods
 * @property {Document} document - document related methods
 * @property {Template} template - template related methods
 * @property {Link} link - link related methods
 * @property {DocumentGroup} documentGroup - document group related methods
 * @property {DocumentGroupTemplate} documentGroupTemplate - document group template related methods
 */

/**
 * SignNow API client initialization
 * @param {InitParams} params - API client initialization params
 * @return {Features}
 */
module.exports = function init ({
  production = true,
  credentials,
}) {
  if (credentials) {
    setCredentials(credentials);
  }

  if (production) {
    setEnvConfig('prod');
  } else {
    setEnvConfig('eval');
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
    documentGroup,
    documentGroupTemplate,
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
