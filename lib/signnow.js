'use strict';
const user = require('./user');
const document = require('./document');
const folder = require('./folder');
const webhook = require('./webhook');
const oauth2 = require('./oauth2');
const enumerations = require('./enumerations');
const template = require('./template');
const link = require('./link');
const { settings } = require('./common');


/**
 * SignNow API Wrapper
 */

module.exports = function({
  credentials, production,
}) {

  // store authorization credentials in common settings
  if (credentials) {
    settings.credentials = credentials;
  }

  // toggle production
  if (production) {
    settings.options.host = 'api.signnow.com';
    settings.basePath = '';
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
