'use strict';

const signnow = require('signnow')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const getDocumentHistory = signnow.document.history;

const id = 'DOCUMENT_ID_GOES_HERE';
const token = 'YOUR_ACCESS_TOKEN';

/**
 * @typedef {Object} DocumentEvent
 * @property {string} client_app_name
 * @property {string} client_timestamp
 * @property {string} created - timestamp of action creation
 * @property {string} email - email of actor
 * @property {string} event
 * @property {string} ip_address
 * @property {?string} document_id
 * @property {?string} element_id
 * @property {?string} field_id
 * @property {?string} json_attributes
 * @property {?string} origin
 * @property {?string} unique_id
 * @property {?string} user_agent
 * @property {?string} user_id - id of actor
 * @property {?string} version
 */

/**
 * @param {DocumentEvent[]} res
 */
const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

getDocumentHistory({
  id,
  token,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
