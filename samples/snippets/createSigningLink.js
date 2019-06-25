'use strict';

const signnow = require('signnow')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const createSigningLink = signnow.link.create;

const document_id = 'DOCUMENT_OR_TEMPLATE_ID_GOES_HERE';
const token = 'YOUR_ACCESS_TOKEN';

/**
 * @param {Object} res
 * @param {string} res.url - url for logged in user
 * @param {string} res.url_no_signup - url for not logged in user
 */
const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

createSigningLink({
  document_id,
  token,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
