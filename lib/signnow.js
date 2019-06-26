'use strict';
const user = require('./user');
const document = require('./document');
const folder = require('./folder');
const webhook = require('./webhook');
const oauth2 = require('./oauth2');
const enumerations = require('./enumerations');
const template = require('./template');
const link = require('./link');
const common = require('./common').settings;


/**
 * SignNow API Wrapper
 */

module.exports = function(settings) {

  // store authorization credentials in common settings
  if (settings.credentials) {
    common.credentials = settings.credentials;
  }

  // toggle production
  if (settings.production && settings.production === true) {
    common.options.host = 'api.signnow.com';
    common.basePath = '';
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
