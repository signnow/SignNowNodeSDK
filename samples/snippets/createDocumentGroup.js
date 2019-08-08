'use strict';

const signnow = require('@signnow/api-client')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const createDocumentGroup = signnow.documentGroup.create;

const group_name = 'NAME_OF_NEW_DOCUMENT_GROUP';
const token = 'YOUR_ACCESS_TOKEN';

// At least one document or template must contain fields
// Documents should not contain sent invites
const ids = [
  'DOCUMENT_1_ID',
  'DOCUMENT_2_ID',
  'TEMPLATE_1_ID',

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
  ids,
  token,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
