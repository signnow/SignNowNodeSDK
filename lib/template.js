'use strict';
const https = require('https');
const {
  responseHandler,
  errorHandler,
  buildRequestOptions,
} = require('./common');
const {
  invite: sendDocumentInvite,
  view: getDocumentDetails,
} = require('./document');

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

  /**
   * Creates an invite to sign a template.
   * You can create a simple free form invite(s) or a role-based invite(s).
   * The method copies a template into document and creates an invite using created document.
   * @param {DocumentInviteParams} data - create template invite payload
   * @param {function(err: ApiErrorResponse, res: DocumentInviteResponse)} [callback] - error first node.js callback
   */
  static invite ({
    id,
    data,
    options,
    token,
  }, callback) {
    this.duplicate({
      id,
      token,
    }, (copyErr, copyRes) => {
      if (copyErr) {
        callback(copyErr);
        return;
      } else if (Array.isArray(data.to)) {
        const { id: documentId } = copyRes;

        getDocumentDetails({
          id: documentId,
          token,
        }, (detailErr, detailRes) => {
          if (detailErr) {
            callback(detailErr);
            return;
          } else {
            const inviteData = Object.assign({}, data, { document_id: documentId });
            const { roles } = detailRes;

            for (const signer of inviteData.to) {
              try {
                signer.role_id = roles.find(role => role.name === signer.role).unique_id;
              } catch (err) {
                callback(err);
                return;
              }
            }

            sendDocumentInvite({
              id: documentId,
              data: inviteData,
              options,
              token,
            }, callback);
          }
        });
      } else {
        const { id: documentId } = copyRes;
        const inviteData = Object.assign({}, data, { document_id: documentId });

        sendDocumentInvite({
          id: documentId,
          data: inviteData,
          options,
          token,
        }, callback);
      }
    });
  }

}

module.exports = Template;
