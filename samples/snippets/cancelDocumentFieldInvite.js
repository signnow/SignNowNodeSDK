'use strict';

const signnow = require('@signnow/api-client')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const cancelDocumentFieldInvite = signnow.document.cancelFieldInvite;

const id = 'DOCUMENT_ID';
const token = 'YOUR_ACCESS_TOKEN';

/**
 * @param {Object} res
 * @param {string} res.status - status of field invite cancelation, e.g. 'success'
 */
const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

cancelDocumentFieldInvite({
  id,
  token,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
