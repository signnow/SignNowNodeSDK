'use strict';
const https = require('https');
const {
  responseHandler,
  errorHandler,
  buildRequestOptions,
} = require('../common');


/**
 * Document Group Template methods
 */
class DocumentGroupTemplate {

  /**
   * Document Group Template invite email congfigurations
   * @typedef {Object} DocumentGroupTemplateInviteEmail
   * @property {string} [email] - signer's email
   * @property {string} [subject] - subject of invitation email
   * @property {string} [message] - content of invitation email
   * @property {number} [expiration_days] - expiration of invite in days
   * @property {number} [reminder] - number of days in which to remind about invite via email
   * @property {boolean} [hasSignActions] - does signer need to sign documents of document group
   * @property {string} [allow_reassign] - allow reassigning of signer
   */

  /**
   * Document Group Template invite action congfigurations
   * @typedef {Object} DocumentGroupTemplateInviteAction
   * @property {string} [email] - signer's email
   * @property {string} [role_name] - signer's role name
   * @property {string} [action] - name of action with document in signing step
   * @property {string} [document_id] - ID of document in specific signing step
   * @property {string} [document_name] - name of document in specific signing step
   * @property {string} [allow_reassign] - allow reassigning of signer
   * @property {string} decline_by_signature - signer can decline invite
   */

  /**
   * Document Group Template invite step congfigurations
   * @typedef {Object} DocumentGroupTemplateInviteStep
   * @property {number} [order] - an order number of invitation step
   * @property {DocumentGroupTemplateInviteEmail[]} [invite_emails] - Document Group Template invite emails settings
   * @property {DocumentGroupTemplateInviteAction[]} invite_actions - Document Group Template invite actions settings
   */

  /**
   * Document Group Template invite congfigurations
   * @typedef {Object} DocumentGroupTemplateRoutingDetails
   * @property {DocumentGroupTemplateInviteStep[]} invite_steps - Document Group Template invite steps settings
   * @property {number} [include_email_attachments] - TODO:
   */

  /**
   * Create Document Group Template payload
   * @typedef {Object} DocumentGroupTemplateCreateParams
   * @property {string} token - your auth token
   * @property {string[]} template_ids - array of template ids for Document Group Template creation
   * @property {string} template_group_name - new name of document group
   * @property {DocumentGroupTemplateRoutingDetails} routing_details - invite congfigurations
   */

  /**
   * Create Document Group Template response data
   * @typedef {Object} DocumentGroupTemplateCreateResponse
   * @property {string} id - Document Group Template unique id
   */

  /**
   * Creates Document Group Template with specified templates and settings
   * @param {DocumentGroupTemplateCreateParams} data - create Document Group Template payload
   * @param {function(err: ApiErrorResponse, res: DocumentGroupTemplateCreateResponse)} [callback] - error first node.js callback
   */
  static create ({
    token,
    template_ids,
    template_group_name,
    routing_details,
  }, callback) {
    const JSONData = JSON.stringify({
      template_ids,
      template_group_name,
      routing_details,
    });
    const req = https
      .request(buildRequestOptions({
        method: 'POST',
        path: '/documentgroup/template',
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


module.exports = DocumentGroupTemplate;
