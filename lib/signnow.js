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
 * SignNow API Wrapper
 */

module.exports = function({
  credentials, production,
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
