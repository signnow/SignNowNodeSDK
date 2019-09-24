'use strict';

const signnow = require('@signnow/api-client')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const viewDocumentGroup = signnow.documentGroup.view;

const id = 'DOCUMENT_GROUP_ID_GOES_HERE';
const token = 'YOUR_ACCESS_TOKEN';

/**
 * Document Group view response data
 * @typedef {Object} DocumentGroupViewResponse
 * @property {string} id - an ID of Document Group
 * @property {string} group_name - a name of Document Group
 * @property {Object[]} documents - each single document details
 * @property {?string} invite_id - an ID of active invite
 * @property {Object[]} originator_organization_settings - originator organization settings
 */

/**
 * @param {DocumentGroupViewResponse} res
 */
const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

viewDocumentGroup({
  id,
  token,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
