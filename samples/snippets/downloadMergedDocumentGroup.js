'use strict';

const signnow = require('@signnow/api-client')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const downloadDocumentGroup = signnow.documentGroup.download;

const id = 'DOCUMENT_GROUP_ID_GOES_HERE';
const token = 'YOUR_ACCESS_TOKEN';
const document_order = [ // specifys the order in which group's documents will be merged
  'ID_OF_THE_FIRST_DOCUMENT',
  'ID_OF_THE_SECOND_DOCUMENT',
];

/**
 * @param {Binary} res - binary data (PDF file) of the document group
 */
const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

downloadDocumentGroup({
  id,
  token,
  type: 'merged', // 'zip' is default
  with_history: 'after_merged_pdf', // 'no' is default, can also be set to 'after_each_document'
  document_order,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
