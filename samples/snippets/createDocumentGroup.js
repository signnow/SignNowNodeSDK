'use strict';

const signnow = require('@signnow/api-client')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const createDocumentGroup = signnow.documentGroup.create;

const group_name = 'NAME_OF_NEW_DOCUMENT_GROUP';
const token = 'YOUR_ACCESS_TOKEN';

// At least one document must contain fields
// Document should not contain sent invites
const document_ids = [
  'DOCUMENT_1_ID',
  'DOCUMENT_2_ID',

  // ...
];

/**
 * @param {Object} res
 * @param {string} res.id - id of created document group
 */
const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

createDocumentGroup({
  group_name,
  document_ids,
  token,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
