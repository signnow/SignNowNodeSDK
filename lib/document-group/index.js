'use strict';

const https = require('https');
const {
  responseHandler,
  errorHandler,
  buildRequestOptions,
} = require('../common');
const { view } = require('../document');
const { duplicate } = require('../template');

/**
 * @type {function}
 * @param {DocumentViewParams} data - view document with field extract payload
 * @return {Promise<DocumentViewResponse, ApiErrorResponse>}
 */
const getDocumentDetails = ({ id, token }) => new Promise((resolve, reject) => {
  view({
    id,
    token,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

/**
 * @type {function}
 * @param {DocumentViewResponse} document
 * @return {boolean} is there any field invite in given document
 */
const hasFieldInvites = document => document.field_invites.length > 0;

/**
 * @type {function}
 * @param {DocumentViewResponse} document
 * @return {boolean} is document a template or not
 */
const isTemplate = document => document.template === true;

/**
 * @type {function}
 * @param {TemplateDuplicateParams} data - duplicate template payload
 * @return {Promise<string, ApiErrorResponse>} resolves with id of new document
 */
const makeDocumentFromTemplate = ({ id, token }) => new Promise((resolve, reject) => {
  duplicate({
    id,
    token,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.id);
    }
  });
});


/**
 * Document Group methods
 */
class DocumentGroup {

  /**
   * Create document group payload
   * @typedef {Object} DocumentGroupCreateParams
   * @property {string} token - your auth token
   * @property {string[]} ids - array of document or template ids for document group creation
   * @property {string} group_name - new name of document group
   */

  /**
   * Create document group response data
   * @typedef {Object} DocumentGroupCreateResponse
   * @property {string} id - document group unique id
   */

  /**
   * Creates document group with specified documents or templates.
   * At least one document or template must contain fields. Documents should not contain pending invites.
   * @param {DocumentGroupCreateParams} data - create document group payload
   * @param {function(err: ApiErrorResponse, res: DocumentGroupCreateResponse)} [callback] - error first node.js callback
   */
  static create ({
    token,
    ids,
    group_name,
  }, callback) {
    const realDocumentIDs = ids
      .map(id => {
        return getDocumentDetails({
          id,
          token,
        })
          .then(document => {
            if (isTemplate(document)) {
              return makeDocumentFromTemplate({
                id,
                token,
              });
            } else if (hasFieldInvites(document)) {
              throw new Error('Document in the group must have no pending invites');
            } else {
              return id;
            }
          });
      });

    Promise.all(realDocumentIDs)
      .then(document_ids => {
        const JSONData = JSON.stringify({
          document_ids,
          group_name,
        });

        const req = https
          .request(buildRequestOptions({
            method: 'POST',
            path: '/documentgroup',
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
      })
      .catch(err => {
        callback(err.message);
        return;
      });
  }

  /**
   * Document Group view payload
   * @typedef {Object} DocumentGroupViewParams
   * @property {string} id - id of specific Document Group
   * @property {string} token - your auth token
   */

  /**
   * Details of single Document in group
   * @typedef {Object} DocumentGroupItem
   * @property {string} id - an ID of Document
   * @property {string} document_name - a name of Document
   * @property {string} origin_document_id - an ID of Document origin
   * @property {boolean} has_credit_card_number - Document has Credit Card number attached
   * @property {boolean} has_unassigned_field - Document has unassigned field(s)
   * @property {DocumentThumbnails} thumbnail - thumbnail urls with different sizes (small, medium, large)
   * @property {string[]} roles - list of template signer roles
   */

  /**
   * Document Group view response data
   * @typedef {Object} DocumentGroupViewResponse
   * @property {string} id - an ID of Document Group
   * @property {string} group_name - a name of Document Group
   * @property {DocumentGroupItem[]} documents - each single document details
   * @property {?string} invite_id - an ID of active invite
   * @property {Object[]} originator_organization_settings - originator organization settings
   */

  /**
   * Retrieves a Document Group detailed data
   * @param {DocumentGroupViewParams} data - view Document Group details payload
   * @param {function(err: ApiErrorResponse, res: DocumentGroupViewResponse)} [callback] - error first node.js callback
   */
  static view ({ id, token }, callback) {
    https
      .request(buildRequestOptions({
        method: 'GET',
        path: `/documentgroup/${id}`,
        authorization: {
          type: 'Bearer',
          token,
        },
      }), responseHandler(callback))
      .on('error', errorHandler(callback))
      .end();
  }

  /**
   * Document Group invite email configurations
   * @typedef {Object} DocumentGroupInviteEmail
   * @property {string} email - signer's email
   * @property {string} [subject] - subject of invitation email
   * @property {string} [message] - content of invitation email
   * @property {number} [expiration_days] - expiration of invite in days
   * @property {number} [reminder] - number of days in which to remind about invitation via email
   */

  /**
   * Document Group signer's authentication with password config
   * @typedef {Object} DocumentGroupInviteAuthenticationPassword
   * @property {string} type - set `password` to authenticate signer with password
   * @property {string} value - authentication password value
   */

  /**
   * Document Group signer's authentication with phone call config
   * @typedef {Object} DocumentGroupInviteAuthenticationPhoneCall
   * @property {string} type - set `phone` to authenticate signer with phone call
   * @property {string} method - set `phone_call` to authenticate signer with phone call
   * @property {string} phone - phone number
   */

  /**
   * Document Group signer's authentication with phone SMS config
   * @typedef {Object} DocumentGroupInviteAuthenticationPhoneSMS
   * @property {string} type - set `phone` to authenticate signer with phone SMS
   * @property {string} method - set `sms` to authenticate signer with phone SMS
   * @property {string} phone - phone number
   */

  /**
   * Document Group invite action congfigurations
   * @typedef {Object} DocumentGroupInviteAction
   * @property {string} email - signer's email
   * @property {string} role_name - signer's role name
   * @property {string} action - name of action with document in signing step
   * @property {string} document_id - ID of document in specific signing step
   * @property {string} [allow_reassign] - allow reassigning of signer
   * @property {string} [decline_by_signature] - signer can decline invite
   * @property {DocumentGroupInviteAuthenticationPassword|DocumentGroupInviteAuthenticationPhoneCall|DocumentGroupInviteAuthenticationPhoneSMS} [authentication] - signer's authentication configuration
   */

  /**
   * Document Group invite step configurations
   * @typedef {Object} DocumentGroupInviteStep
   * @property {number} order - an order number of invitation step
   * @property {DocumentGroupInviteEmail[]} [invite_emails] - Document Group invite emails settings
   * @property {DocumentGroupInviteAction[]} invite_actions - Document Group invite actions settings
   */

  /**
   * Document Group invite completion email configuration
   * @typedef {Object} DocumentGroupInviteCompletionEmailConfig
   * @property {string} email - email for completion (only from the signers and document owner emails)
   * @property {number} disable_document_attachment - disable attachment of signed document group to completion email (values: 0|1)
   */

  /**
   * Document Group invite settings
   * @typedef {Object} DocumentGroupInviteSettings
   * @property {DocumentGroupInviteStep[]} invite_steps - Document Group invite steps settings
   * @property {DocumentGroupInviteCompletionEmailConfig[]} [completion_emails] - set of completion email configutrations
   */

  /**
   * Create Document Group invite payload
   * @typedef {Object} DocumentGroupInviteParams
   * @property {string} id - ID of specific Document Group
   * @property {DocumentGroupInviteSettings} data - Document Group invite settings data
   * @property {string} token - your auth token
   */

  /**
   * Create Document Group invite response data
   * @typedef {Object} DocumentGroupInviteResponse
   * @property {string} id - ID of created Document Group invitation
   * @property {?string} pending_invite_link - pending invite link
   */

  /**
   * Creates an invite to sign a Document Group
   * @param {DocumentGroupInviteParams} data - create Document Group invite payload
   * @param {function(err: ApiErrorResponse, res: DocumentGroupInviteResponse)} [callback] - error first node.js callback
   */
  static invite ({
    id,
    data,
    token,
  }, callback) {
    const {
      invite_steps,
      completion_emails,
    } = data;

    const JSONData = JSON.stringify({
      invite_steps,
      completion_emails,
    });

    const req = https
      .request(buildRequestOptions({
        method: 'POST',
        path: `/documentgroup/${id}/groupinvite`,
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


module.exports = DocumentGroup;
