'use strict';
const https = require('https');
const { readFileSync } = require('fs');
const { basename } = require('path');
const {
  responseHandler,
  errorHandler,
  buildRequestOptions,
  isCSVFile,
  getFormDataBoundary,
} = require('../common');
const {
  remove,
  invite,
  view,
} = require('../document');
const { promisify } = require('../../utils');

/**
 * @type {function}
 * @param {DocumentRemoveParams} data - remove document payload
 * @param {function(err: ApiErrorResponse, res: DocumentRemoveResponse)} [callback] - error first node.js callback
 */
const removeDocument = remove;

/**
 * @type {function}
 * @param {DocumentInviteParams} data - create document invite payload
 * @param {function(err: ApiErrorResponse, res: DocumentInviteResponse)} [callback] - error first node.js callback
 */
const sendDocumentInvite = invite;

/**
 * @type {function}
 * @param {DocumentViewParams} data - view document with field extract payload
 * @param {function(err: ApiErrorResponse, res: DocumentViewResponse)} [callback] - error first node.js callback
 */
const getDocumentDetails = view;

/**
 * Update Signing Role payload
 * @typedef {Object} TemplateUpdateSigningRoleParams
 * @property {string} id - an ID of Actor (role)
 * @property {string} token - your auth token
 * @property {number} signing_order - signing order number
 */

/**
 * Update Signing Role response data
 * @typedef {Object} TemplateUpdateSigningRoleResponse
 * @property {string} id - unique ID of Actor
 * @property {string} document_id - unique ID of Template
 * @property {number} signing_order - signing order number
 */

/**
 * Updates Signing Role with order of actor
 * @param {TemplateUpdateSigningRoleParams} data - update signing role payload
 * @param {function(err: ApiErrorResponse, res: TemplateUpdateSigningRoleResponse)} [callback] - error first node.js callback
 */
const updateSigningRole = ({
  id,
  token,
  signing_order,
}, callback) => {
  const JSONData = JSON.stringify({ signing_order });
  const req = https
    .request(buildRequestOptions({
      method: 'PUT',
      path: `/role/${id}`,
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
};

/**
 * Template methods
 */
class Template {

  /**
   * Document invite optional settings
   * @typedef {Object} TemplateCreateOptions
   * @property {boolean} [removeOriginalDocument=false] - if true original document will be removed
   */

  /**
   * Create template payload
   * @typedef {Object} TemplateCreateParams
   * @property {string} document_id - an id of original document
   * @property {string} document_name - a name of new template
   * @property {TemplateCreateOptions} options - create template optional settings
   * @property {string} token - your auth token
   */

  /**
   * Create template response data
   * @typedef {Object} TemplateCreateResponse
   * @property {string} id - an id of created template
   */

  /**
   * Creates a template by copying an existing unfulfilled and not requested for sign document.
   * By default original document is not removed after template creation. To remove original document set `removeOriginalDocument` option to `true`.
   * @param {TemplateCreateParams} data - create template payload
   * @param {function(err: ApiErrorResponse, res: TemplateCreateResponse)} [originalCallback] - error first node.js callback
   */
  static create ({
    document_id,
    document_name,
    options: { removeOriginalDocument = false } = {},
    token,
  }, originalCallback) {
    const JSONData = JSON.stringify({
      document_id,
      document_name,
    });

    const callbackWithDocumentDeletion = (createErr, createRes) => {
      if (createErr) {
        originalCallback(createErr);
        return;
      } else {
        removeDocument({
          id: document_id,
          token,
        }, removeErr => {
          if (removeErr) {
            originalCallback(removeErr);
            return;
          } else {
            originalCallback(null, createRes);
            return;
          }
        });
      }
    };

    const callback = removeOriginalDocument
      ? callbackWithDocumentDeletion
      : originalCallback;

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
      .on('error', errorHandler(originalCallback));

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
   * Create invite with template payload
   * @typedef {DocumentInviteParams} TemplateInviteParams
   */

  /**
   * Create invite with template response data
   * @typedef {DocumentInviteResponse} TemplateInviteResponse
   */

  /**
   * Creates an invite to sign a template.
   * You can create a simple free form invite(s) or a role-based invite(s).
   * The method copies a template into document and creates an invite using created document.
   * @param {TemplateInviteParams} data - create template invite payload
   * @param {function(err: ApiErrorResponse, res: TemplateInviteResponse)} [callback] - error first node.js callback
   */
  static invite ({
    id,
    data,
    options,
    token,
  }, callback) {
    Template.duplicate({
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

  /**
   * Remove template payload
   * @typedef {DocumentRemoveParams} TemplateRemoveParams
   */

  /**
   * Remove template response data
   * @typedef {DocumentRemoveResponse} TemplateRemoveResponse
   */

  /**
   * Removes a specified template from folder
   * @param {TemplateRemoveParams} data - remove template payload
   * @param {function(err: ApiErrorResponse, res: TemplateRemoveResponse)} [callback] - error first node.js callback
   */
  static remove ({
    id,
    token,
    options,
  }, callback) {
    removeDocument({
      id,
      token,
      options,
    }, callback);
  }

  /**
   * Get Template Routing Details payload
   * @typedef {Object} TemplateGetRoutingDetailsParams
   * @property {string} id - an ID of specific Template
   * @property {string} token - your auth token
   */

  /**
   * Template Routing Details item data
   * @typedef {Object} TemplateRoutingDetailsItem
   * @property {string} default_email - default email for routing detail
   * @property {boolean} inviter_role - always `false`
   * @property {string} name - signer role (actor) name
   * @property {string} role_id - signer role (actor) unique ID
   * @property {number} signing_order - order number of signing step
   */

  /**
   * Template Routing Details CC step info
   * @typedef {Object} TemplateRoutingDetailsCCStep
   * @property {string} email - email of cc step
   * @property {number} step - step order number
   * @property {string} name - name of cc step
   */

  /**
   * Get Template Routing Details response data
   * @typedef {Object} TemplateGetRoutingDetailsResponse
   * @property {TemplateRoutingDetailsItem[]} routing_details - array with routing details
   * @property {string[]} cc - CC emails
   * @property {TemplateRoutingDetailsCCStep[]} cc_step - array of CC`s steps
   * @property {string} invite_link_instructions - invite link instructions
   */

  /**
   * Retrieves Routing Details of specified Template
   * @param {TemplateGetRoutingDetailsParams} data - get Routing Details payload
   * @param {function(err: ApiErrorResponse, res: TemplateGetRoutingDetailsResponse)} [callback] - error first node.js callback
   */
  static getRoutingDetails ({
    id,
    token,
  }, callback) {
    https
      .request(buildRequestOptions({
        method: 'GET',
        path: `/document/${id}/template/routing/detail`,
        authorization: {
          type: 'Bearer',
          token,
        },
      }), responseHandler(callback))
      .on('error', errorHandler(callback))
      .end();
  }

  /**
   * Template Update Routing Details item data
   * @typedef {Object} TemplateUpdateRoutingDetailsItem
   * @property {string} default_email - default email for routing detail
   * @property {boolean} inviter_role - always `false`
   * @property {string} name - signer role (actor) name
   * @property {string} role_id - signer role (actor) unique ID
   * @property {number} signing_order - order number of signing step
   * @property {boolean} decline_by_signature - decline by signature flag
   */

  /**
   * Update Template Routing Details settings
   * @typedef {Object} TemplateUpdateRoutingDetailsSettings
   * @property {TemplateUpdateRoutingDetailsItem[]} template_data - array with routing details
   * @property {string[]} cc - CC emails
   * @property {TemplateRoutingDetailsCCStep[]} cc_step - array of CC steps
   * @property {string} [invite_link_instructions] - invite signing instructions
   */

  /**
   * Update Template Routing Details payload
   * @typedef {Object} TemplateUpdateRoutingDetailsParams
   * @property {string} id - an ID of specific Template
   * @property {string} token - your auth token
   * @property {TemplateUpdateRoutingDetailsSettings} data - update Template Routing Details settings
   */

  /**
   * Update Template Routing Details response data
   * @typedef {Object} TemplateUpdateRoutingDetailsResponse
   * @property {string} id - unique ID of template routing details
   * @property {string} document_id - unique ID of Template
   * @property {TemplateUpdateRoutingDetailsItem[]} data - array with routing details
   * @property {string[]} cc - CC emails
   * @property {TemplateRoutingDetailsCCStep[]} cc_step - array of CC steps
   * @property {string} invite_link_instructions - invite signing instructions
   */

  /**
   * Updates Routing Details of specified template
   * @param {TemplateUpdateRoutingDetailsParams} data - update Template Routing Details payload
   * @param {function(err: ApiErrorResponse, res: TemplateUpdateRoutingDetailsResponse)} [callback] - error first node.js callback
   */
  static updateRoutingDetails ({
    id,
    token,
    data,
  }, callback) {
    const {
      template_data,
      cc,
      cc_step,
      invite_link_instructions,
    } = data;
    const JSONData = JSON.stringify({
      template_data,
      cc,
      cc_step,
      invite_link_instructions,
    });

    const updateCallback = (err, res) => {
      if (err) {
        callback(err);
        return;
      } else {
        const { data: routingDetails } = res;
        const rolesUpdated = routingDetails
          .map(route => {
            const { role_id, signing_order } = route;
            return promisify(updateSigningRole)({
              id: role_id,
              signing_order,
              token,
            });
          });

        Promise.all(rolesUpdated)
          .then(roleUpdatesRes => {
            return roleUpdatesRes.reduce((generalStatus, roleUpdateRes) => (generalStatus && !!roleUpdateRes.id), true);
          })
          .then(allRolesUpdated => {
            if (allRolesUpdated) {
              callback(null, res);
              return;
            } else {
              throw new Error('Some roles (actors) where not updated');
            }
          })
          .catch(roleUpdatesErr => {
            callback(roleUpdatesErr);
            return;
          });
      }
    };

    const req = https
      .request(buildRequestOptions({
        method: 'PUT',
        path: `/document/${id}/template/routing/detail`,
        authorization: {
          type: 'Bearer',
          token,
        },
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(JSONData),
        },
      }), responseHandler(updateCallback))
      .on('error', errorHandler(callback));

    req.write(JSONData);
    req.end();
  }

  /**
   * Template Bulk Invite settings
   * @typedef {Object} TemplateBulkInviteSettings
   * @property {string} file - path to .csv file with roles and their emails. Max file size should be <= 1 Megabyte
   * @property {string} folder_id - an ID of folder where signed documents will be saved
   * @property {number} [client_timestamp] - client timestamp in seconds
   * @property {string} [document_name] - setup prefix for each document name
   * @property {string} [subject] - custom email subject
   * @property {string} [email_message] - custom email message
   */

  /**
   * Send Template Bulk Invite payload
   * @typedef {Object} TemplateBulkInviteParams
   * @property {string} id - an ID of specific Template
   * @property {string} token - your auth token
   * @property {TemplateBulkInviteSettings} data - Template Bulk Invite settings
   */

  /**
   * Send Template Bulk Invite response data
   * @typedef {Object} TemplateBulkInviteResponse
   * @property {string} status - status of sending bulk invites (e.g. "job queued")
   */

  /**
   * Sends invites to sign a specified template to multiple signers at once
   * @experimental internal implementation of this method might be changed
   * @param {TemplateBulkInviteParams} data - Bulk Invite payload
   * @param {function(err: ApiErrorResponse, res: TemplateBulkInviteResponse)} [callback] - error first node.js callback
   */
  static bulkInvite ({
    id,
    token,
    data,
  }, callback) {
    const {
      file,
      folder_id,
      client_timestamp,
      document_name,
      subject,
      email_message,
    } = data;

    if (!isCSVFile(file)) {
      callback('The file that was tried to be uploaded is not a CSV file');
      return;
    }

    const metaData = {
      folder_id,
      client_timestamp,
      document_name,
      subject,
      email_message,
    };

    const formDataBoundary = getFormDataBoundary();
    const formDataBeginning = Object
      .entries(metaData)
      .reduce((formData, [
        name,
        value,
      ]) => `${formData}--${formDataBoundary}\r\nContent-Disposition: form-data; name="${name}";\r\n\r\n${value}\r\n`, '')
      .concat(`--${formDataBoundary}\r\n`)
      .concat(`Content-Disposition: form-data; name="file"; filename="${basename(file)}"\r\n`)
      .concat('Content-Type: text/csv\r\n\r\n');
    const formDataEnding = `\r\n--${formDataBoundary}\r\n`;
    let fileContent;

    try {
      fileContent = readFileSync(file);
    } catch (err) {
      callback(err);
      return;
    }

    const payload = Buffer.concat([
      Buffer.from(formDataBeginning, 'utf8'),
      Buffer.from(fileContent, 'binary'),
      Buffer.from(formDataEnding, 'utf8'),
    ]);

    const req = https
      .request(buildRequestOptions({
        method: 'POST',
        path: `/template/${id}/bulkinvite`,
        authorization: {
          type: 'Bearer',
          token,
        },
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formDataBoundary}`,
          'Content-Length': Buffer.byteLength(payload),
        },
      }), responseHandler(callback))
      .on('error', errorHandler(callback));

    req.write(payload);
    req.end();
  }

}

module.exports = Template;
