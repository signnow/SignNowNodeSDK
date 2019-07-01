'use strict';
const https = require('https');
const {
  responseHandler, errorHandler, buildRequestOptions,
} = require('./common');


/**
 * Enumeration Methods
 */

/*
 * add an enumeration field(drop down) to a document.
 * NOTE: must be used with POST /enumeration_options () or the API will not recognize it
 */

exports.addField = function(obj, callback) {
  const req = https.request(buildRequestOptions({
    method: 'POST',
    path: '/enumeration_field',
    authorization: {
      type: 'Bearer',
      token: obj.token,
    },
  }), responseHandler(callback));

  req.on('error', errorHandler(callback));
  req.write(JSON.stringify(obj));
  req.end();
};

/*
 * add enumeration options to the field that was created using the REST call above.
 * NOTE: must be used with POST /enumeration_field () or the API will not recognize the field
 */

exports.addOptions = function(obj, callback) {
  const req = https.request(buildRequestOptions({
    method: 'POST',
    path: '/enumeration_options',
    authorization: {
      type: 'Bearer',
      token: obj.token,
    },
  }), responseHandler(callback));

  req.on('error', errorHandler(callback));
  req.write(JSON.stringify(obj));
  req.end();
};
