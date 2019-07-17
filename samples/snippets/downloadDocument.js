'use strict';

const signnow = require('signnow')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const downloadDocument = signnow.document.download;

const id = 'DOCUMENT_ID_GOES_HERE';
const token = 'YOUR_ACCESS_TOKEN';

/**
 * @param {Binary} res - binary data (file) of the entire document
 */
const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

downloadDocument({
  id,
  token,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
