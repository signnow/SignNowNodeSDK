'use strict';
const https = require('https');
const {
  responseHandler, errorHandler, buildRequestOptions,
} = require('./common');


/**
 * Template methods
 */
class Template {

  /**
   * Create template payload
   * @typedef {Object} TemplateCreateParams
   * @property {string} document_id - an id of original document
   * @property {string} document_name - a name of new template
   * @property {string} token - your auth token
   */

  /**
   * Create template response data
   * @typedef {Object} TemplateCreateResponse
   * @property {string} id - an id of created template
   */

  /**
   * Create a template by copying an existing unfulfilled and not requested for sign document.
   * If a name is not supplied then template name will be set to the original document's name by default.
   * @param {TemplateCreateParams} data - create template payload
   * @param {function(err: ApiErrorResponse, res: TemplateCreateResponse)} [callback] - error first node.js callback
   */
  static create ({
    document_id,
    document_name,
    token,
  }, callback) {
    const JSONData = JSON.stringify({
      document_id,
      document_name,
    });

    const req = https
      .request(buildRequestOptions({
        method: 'POST',
        path: '/template',
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

  /**
   * Copy template payload
   * @typedef {Object} TemplateDuplicateParams
   * @property {string} id - an id of original template
   * @property {string} name - a name of new document
   * @property {string} token - your auth token
   */

  /**
   * Copy template response data
   * @typedef {Object} TemplateDuplicateResponse
   * @property {string} id - an id of created document
   * @property {string} name - a name of created document
   */

  /**
   * Creates a new document by copying a template.
   * If a name is not supplied then document name will be set to the original template's name by default.
   * @param {TemplateDuplicateParams} data - duplicate template payload
   * @param {function(err: ApiErrorResponse, res: TemplateDuplicateResponse)} [callback] - error first node.js callback
   */
  static duplicate ({
    id: template_id,
    name: document_name,
    token,
  }, callback) {
    const JSONData = JSON.stringify({
      template_id,
      document_name,
    });

    const req = https
      .request(buildRequestOptions({
        method: 'POST',
        path: `/template/${template_id}/copy`,
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

module.exports = Template;
