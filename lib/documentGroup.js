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
 * @param {function(err: ApiErrorResponse, res: DocumentViewResponse)} [callback] - error first node.js callback
 */
const getDocumentDetails = view;

/**
 * @type {function}
 * @param {DocumentViewParams} data - view document with field extract payload
 * @return {Promise<boolean, ApiErrorResponse>}
 */
const isTemplate = ({ id, token }) => new Promise((resolve, reject) => {
  getDocumentDetails({
    id,
    token,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.template === true);
    }
  });
});

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
        return isTemplate({
          id,
          token,
        })
          .then(isTpl => {
            if (isTpl) {
              return makeDocumentFromTemplate({
                id,
                token,
              });
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
      });

  }
}

module.exports = DocumentGroup;
