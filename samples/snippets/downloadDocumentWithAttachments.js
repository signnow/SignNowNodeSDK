'use strict';

const signnow = require('@signnow/api-client')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const downloadDocument = signnow.document.download;

const id = 'DOCUMENT_ID_GOES_HERE';
const token = 'YOUR_ACCESS_TOKEN';
const options = { zip: true }; // option points on downloading document archived in zip

/**
 * @param {Buffer} res - binary data (file) of the entire document
 */

const handleResponse = res => {
  console.log(res); // save the file to your disk or pipe it to another handler
};

const handleError = err => {
  console.error(err);
};

downloadDocument({
  id,
  token,
  options,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
