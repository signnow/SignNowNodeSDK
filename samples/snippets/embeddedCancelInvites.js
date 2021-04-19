'use strict';

const signnow = require('@signnow/api-client')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const { cancelInvites } = signnow.embedded;

const token = 'YOUR_ACCESS_TOKEN';
const documentId = 'DOCUMENT_ID_GOES_HERE';

/**
 * @param {Object} res
 */
const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

cancelInvites({
  token,
  document_id: documentId,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
