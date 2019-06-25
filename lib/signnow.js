'use strict';

(function() {
  /**
     * SignNow API Wrapper
     */

  var user = require('./user'),
    document = require('./document'),
    folder = require('./folder'),
    webhook = require('./webhook'),
    oauth2 = require('./oauth2'),
    enumerations = require('./enumerations'),
    template = require('./template'),
    link = require('./link'),
    common = require('./common').settings;

  module.exports = function(settings) {
    //store authorization credentials in common settings
    if (settings.credentials) {
      common.credentials = settings.credentials;
    }

    //toggle production
    if (settings.production && settings.production === true) {
      common.options.host = 'api.signnow.com';
      common.basePath = '';
    }

    return {
      user: user,
      oauth2: oauth2,
      document: document,
      webhook: webhook,
      folder: folder,
      enumerations: enumerations,
      template: template,
      link: link,
    };
  };
})();
