'use strict';

const signnow = require('@signnow/api-client')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const { cancelInvite: cancelDocumentGroupInvite } = signnow.documentGroup;

const id = 'ID_OF_DOCUMENTGROUP';
const inviteId = 'ID_OF_INVITE';
const token = 'YOUR_ACCESS_TOKEN';

/**
 * @param {Object} res
 * @param {string} res.status - status (exp. "success")
 */
const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

cancelDocumentGroupInvite({
  id,
  inviteId,
  token,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
