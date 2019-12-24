'use strict';

const fs = require('fs');
const signnow = require('@signnow/api-client')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const { download: downloadDocumentGroup } = signnow.documentGroup;

const id = 'DOCUMENT_GROUP_ID_GOES_HERE';
const token = 'YOUR_ACCESS_TOKEN';

// specify the order in which group's documents will be merged
const document_order = [
  'DOCUMENT_ID_1',
  'DOCUMENT_ID_2',
];

/**
 * @param {Buffer} res - binary data of the merged Document Group (PDF file)
 */
const handleResponse = res => {
  fs.writeFileSync('absolute/path', res, { encoding: 'binary' });
};

const handleError = err => {
  console.error(err);
};

downloadDocumentGroup({
  id,
  token,
  type: 'merged',
  with_history: 'after_merged_pdf',
  document_order,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
