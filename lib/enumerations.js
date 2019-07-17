'use strict';
const https = require('https');
const {
  responseHandler,
  errorHandler,
  buildRequestOptions,
} = require('./common');


/**
 * Enumeration methods
 */
class Enumerations {

  /*
   * add an enumeration field (drop down) to a document.
   * NOTE: must be used with POST /enumeration_options () or the API will not recognize it
   */
  static addField (data, callback) {
    const { token } = data;
    delete data.token;

    const JSONData = JSON.stringify(data);
    const req = https
      .request(buildRequestOptions({
        method: 'POST',
        path: '/enumeration_field',
        authorization: {
          type: 'Bearer',
          token,
        },
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(JSONData),
        },
      }), responseHandler(callback))
      .on('error', errorHandler(callback));

    req.write(JSONData);
    req.end();
  }

  /*
   * add enumeration options to the field that was created using the REST call above.
   * NOTE: must be used with POST /enumeration_field () or the API will not recognize the field
   */
  static addOptions (data, callback) {
    const { token } = data;
    delete data.token;

    const JSONData = JSON.stringify(data);
    const req = https
      .request(buildRequestOptions({
        method: 'POST',
        path: '/enumeration_options',
        authorization: {
          type: 'Bearer',
          token,
        },
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(JSONData),
        },
      }), responseHandler(callback))
      .on('error', errorHandler(callback));

    req.write(JSONData);
    req.end();
  }

}

module.exports = Enumerations;
