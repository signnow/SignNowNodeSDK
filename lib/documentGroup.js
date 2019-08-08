'use strict';

const https = require('https');
const {
  responseHandler,
  errorHandler,
  buildRequestOptions,
} = require('./common');
const { view } = require('./document');
const { duplicate } = require('./template');

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
 * @return {boolean} is there any siganture request in given document
 */
const hasSignatureInvites = document => document.requests.length > 0;

/**
 * @type {function}
 * @param {DocumentViewResponse} document
 * @return {boolean} is there any field invite in given document
 */
const hasFieldInvites = document => document.field_invites.length > 0;

/**
 * @type {function}
 * @param {DocumentViewResponse} document
 * @return {boolean} is there any signature in given document
 */
const hasSignatures = document => document.signatures.length > 0;

/**
 * @type {function}
 * @param {DocumentViewResponse} document
 * @return {boolean} is document a template or not
 */
const isTemplate = document => document.template === true;

/**
 * @type {function}
 * @param {DocumentViewResponse} document
 * @return {boolean} can document be used for Document Group creation or not
 */
const canBeAddedToDocumentGroup = document => (
  !hasSignatureInvites(document)
  && !hasFieldInvites(document)
  && !hasSignatures(document)
);

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
   * At least one document or template must contain fields. Documents should not contain sent invites.
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
            } else if (canBeAddedToDocumentGroup(document)) {
              return id;
            } else {
              throw new Error('Document in the group must have no pending invites, signature requests or completed signatures');
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
}

module.exports = DocumentGroup;
