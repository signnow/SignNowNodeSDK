'use strict';
const https = require('https');
const { settings, responseHandler, errorHandler } = require('./common');


/**
 * Enumeration Methods
 */

/*
 * add an enumeration field(drop down) to a document.
 * NOTE: must be used with POST /enumeration_options () or the API will not recognize it
 */

exports.addField = function(obj, callback){
  settings.options.method = 'POST';
  settings.options.headers.Authorization = 'Bearer ' + obj.token;
  settings.options.path = settings.basePath + '/enumeration_field';

  const req = https.request(settings.options, responseHandler(callback));

  req.on('error', errorHandler(callback));
  req.write(JSON.stringify(obj));
  req.end();
};

/*
 * add enumeration options to the field that was created using the REST call above.
 * NOTE: must be used with POST /enumeration_field () or the API will not recognize the field
 */

exports.addOptions = function(obj, callback){
  settings.options.method = 'POST';
  settings.options.headers.Authorization = 'Bearer ' + obj.token;
  settings.options.path = settings.basePath + '/enumeration_options';

  const req = https.request(settings.options, responseHandler(callback));

  req.on('error', errorHandler(callback));
  req.write(JSON.stringify(obj));
  req.end();
};
