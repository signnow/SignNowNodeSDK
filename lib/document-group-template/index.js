'use strict';
const https = require('https');
const {
  responseHandler,
  errorHandler,
  buildRequestOptions,
} = require('../common');
const {
  create: createDocumentGroup,
  invite: inviteDocumentGroup,
} = require('../document-group');

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
   * @property {string} [role_viewName] - signer's role display name
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
   * @property {number} [include_email_attachments]
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

  /**
   * Document Group Template view payload
   * @typedef {Object} DocumentGroupTemplateViewParams
   * @property {string} id - id of specific Document Group Template
   * @property {string} token - your auth token
   */

  /**
   * Details of single template in group
   * @typedef {Object} DocumentGroupTemplateItem
   * @property {string} id - id of template
   * @property {string} template_name - name of template
   * @property {string} owner_email - template owner email
   * @property {?number} readable
   * @property {DocumentThumbnails} thumbnail - thumbnail urls with different sizes (small, medium, large)
   * @property {string[]} roles - list of template signer roles
   */

  /**
   * Document Group Template view response
   * @typedef {Object} DocumentGroupTemplateViewResponse
   * @property {string} id - id of Document Group Template
   * @property {string} group_name - name of Document Group Template
   * @property {string} document_group_template_owner_email - Document Group Template owner email
   * @property {number} shared - is Document Group Template shared or not (values: 0 or 1)
   * @property {?string} shared_team_id - id of team which Document Group Template is shared with
   * @property {DocumentGroupTemplateItem[]} templates - each single template details
   * @property {DocumentGroupTemplateRoutingDetails} routing_details - signing steps configuration
   * @property {Object[]} originator_organization_settings - originator organization settings
   */

  /**
   * Retrieves a Document Group Template detailed data
   * @param {DocumentGroupTemplateViewParams} data - view Document Group Template details payload
   * @param {function(err: ApiErrorResponse, res: DocumentGroupTemplateViewResponse)} [callback] - error first node.js callback
   */
  static view ({ id, token }, callback) {
    https
      .request(buildRequestOptions({
        method: 'GET',
        path: `/documentgroup/template/${id}`,
        authorization: {
          type: 'Bearer',
          token,
        },
      }), responseHandler(callback))
      .on('error', errorHandler(callback))
      .end();
  }

  /**
   * Create Document Group Template invite payload
   * @typedef {Object} DocumentGroupTemplateInviteParams
   * @property {string} id - ID of specific Document Group Template
   * @property {DocumentGroupInviteSettings} data - Document Group invite settings data
   * @property {string} token - your auth token
   */

  /**
   * Create Document Group Template invite response data
   * @typedef {DocumentGroupInviteResponse} DocumentGroupTemplateInviteResponse
   */

  /**
   * Creates an invite to sign a Document Group Template
   * @param {DocumentGroupTemplateInviteParams} data - create Document Group Template invite payload
   * @param {function(err: ApiErrorResponse, res: DocumentGroupTemplateInviteResponse)} [callback] - error first node.js callback
   */
  static invite ({
    id,
    data,
    token,
  }, callback) {
    DocumentGroupTemplate.view({
      id,
      token,
    }, (viewErr, viewRes) => {
      if (viewErr) {
        callback(viewErr);
        return;
      } else {
        const {
          templates,
          group_name,
          routing_details = {},
        } = viewRes;
        let templateIDs;

        try {
          templateIDs = templates.map(template => template.id);
        } catch (err) {
          callback(err);
          return;
        }

        createDocumentGroup({
          ids: templateIDs,
          group_name,
          token,
        }, (createErr, createRes) => {
          if (createErr) {
            callback(createErr);
            return;
          } else {
            const { id: documentGroupId } = createRes;
            const inviteSettings = Object.assign({}, data, (routing_details.invite_steps ? routing_details : {}));

            inviteDocumentGroup({
              id: documentGroupId,
              data: inviteSettings,
              token,
            }, (inviteErr, inviteRes) => {
              if (inviteErr) {
                callback(inviteErr);
                return;
              } else {
                callback(null, inviteRes);
                return;
              }
            });
          }
        });
      }
    });
  }

}

module.exports = DocumentGroupTemplate;
