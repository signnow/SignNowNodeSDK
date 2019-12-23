'use strict';

const signnow = require('@signnow/api-client')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const { create: uploadDocument } = signnow.document;

const filepath = 'PATH_TO_FILE_TO_BE_UPLOADED';
const token = 'YOUR_ACCESS_TOKEN';

/**
 * @param {Object} res
 * @param {string} res.id - an id of created Document
 */
const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

uploadDocument({
  filepath,
  token,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
