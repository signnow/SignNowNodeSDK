'use strict';

const signnow = require('@signnow/api-client')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const { generateInviteLink } = signnow.embedded;

const token = 'YOUR_ACCESS_TOKEN';
const documentId = 'DOCUMENT_ID_GOES_HERE';
const fieldInviteUniqueId = 'FIELD_INVITE_ID_GOES_HERE';
const linkExpiration = 'LINK_EXPIRATION';
const authMethod = 'SIGNER_AUTH_METHOD';

/**
 * @param {Object} res
 */
const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

generateInviteLink({
  token,
  document_id: documentId,
  field_invite_unique_id: fieldInviteUniqueId,
  link_expiration: linkExpiration,
  auth_method: authMethod,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
