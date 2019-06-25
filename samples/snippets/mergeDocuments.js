'use strict';

const signnow = require('signnow')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const mergeDocuments = signnow.document.merge;

const name = 'NAME_OF_MERGED_DOCUMENT';
const token = 'YOUR_ACCESS_TOKEN';
const document_ids = [
  'DOCUMENT_1_ID',
  'DOCUMENT_2_ID',

  // ...
];

/**
 * @param {Object} res
 * @param {string} res.document_id - id of merged document
 */
const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

mergeDocuments({
  name,
  document_ids,
  token,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
