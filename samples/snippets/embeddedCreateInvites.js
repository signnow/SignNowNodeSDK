'use strict';

const signnow = require('@signnow/api-client')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const { createInvite } = signnow.embedded;

const token = 'YOUR_ACCESS_TOKEN';
const documentId = 'DOCUMENT_ID_GOES_HERE';
const invites = [
  {
    email: 'EMAIL_OF_SIGNER',
    role_id: 'ROLE_ID',
    order: 1,
    auth_method: 'password',
  },
];

/**
 * @param {Object} res
 */
const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

createInvite({
  document_id: documentId,
  invites,
  token,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
