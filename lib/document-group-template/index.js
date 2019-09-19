'use strict';
const https = require('https');
const {
  responseHandler,
  errorHandler,
  buildRequestOptions,
} = require('../common');
const documentGroup = require('../document-group');
const createDocumentGroup = documentGroup.create;
const inviteDocumentGroup = documentGroup.invite;
const viewDocumentGroup = documentGroup.view;

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
   * @property {DocumentGroupInviteSettings} [data] - Document Group Template invite settings data
   * @property {string} token - your auth token
   */

  /**
   * Create Document Group Template invite response data
   * @typedef {DocumentGroupInviteResponse} DocumentGroupTemplateInviteResponse
   * @property {string} id - an ID of created invite
   * @property {?string} pending_invite_link - pending invite link
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
    }, (viewDocGrTplErr, viewDocGrTplRes) => {
      if (viewDocGrTplErr) {
        callback(viewDocGrTplErr);
        return;
      } else {
        const {
          templates,
          group_name,
          routing_details = {},
        } = viewDocGrTplRes;
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

            viewDocumentGroup({
              id: documentGroupId,
              token,
            }, (viewDocGrErr, viewDocGrRes) => {
              if (viewDocGrErr) {
                callback(viewDocGrErr);
                return;
              } else {
                const { documents } = viewDocGrRes;
                let documentToOriginMap;
                let inviteSettings;

                try {
                  documentToOriginMap = documents.reduce((map, doc) => {
                    map[doc.origin_document_id] = doc.id;
                    return map;
                  }, {});

                  inviteSettings = Object.assign({}, (routing_details.invite_steps ? routing_details : {}), data);

                  inviteSettings.invite_steps.forEach(step => {
                    step.invite_emails = step.invite_emails.map(inviteEmail => {
                      const {
                        email,
                        subject,
                        message,
                        expiration_days,
                        reminder,
                      } = inviteEmail;

                      return {
                        email,
                        subject,
                        message,
                        expiration_days,
                        reminder,
                      };
                    });

                    step.invite_actions = step.invite_actions.map(inviteAction => {
                      const {
                        email,
                        role_name,
                        action,
                        document_id,
                        allow_reassign,
                        decline_by_signature,
                        authentication,
                      } = inviteAction;

                      return {
                        document_id: documentToOriginMap[document_id],
                        email,
                        role_name,
                        action,
                        allow_reassign,
                        decline_by_signature,
                        authentication,
                      };
                    });
                  });
                } catch (err) {
                  callback(err);
                  return;
                }

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
    });
  }

}

module.exports = DocumentGroupTemplate;
