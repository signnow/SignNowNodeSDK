'use strict';

const signnow = require('@signnow/api-client')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const { download: downloadDocumentGroup } = signnow.documentGroup;

const id = 'DOCUMENT_GROUP_ID_GOES_HERE';
const token = 'YOUR_ACCESS_TOKEN';

/**
 * @param {Buffer} res - binary data of the zipped Document Group (ZIP archive)
 */
const handleResponse = res => {
  // save the file to your disk or pipe it to another handler
};

const handleError = err => {
  console.error(err);
};

downloadDocumentGroup({
  id,
  token,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
