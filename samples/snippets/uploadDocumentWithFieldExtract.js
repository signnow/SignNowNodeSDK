'use strict';

const signnow = require('signnow')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const uploadDocumentWithFieldExtract = signnow.document.fieldextract;

const filepath = 'FILE_PATH_GOES_HERE';
const token = 'YOUR_ACCESS_TOKEN';

/**
 * @param {Object} res
 * @param {string} res.id - an id of created document
 */
const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

uploadDocumentWithFieldExtract({
  filepath,
  token,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
