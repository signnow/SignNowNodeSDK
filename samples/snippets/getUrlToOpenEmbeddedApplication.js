'use strict';

const signnow = require('@signnow/api-client')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const getEmbeddedApplicationUrl = signnow.embed.getApplicationUrl;

const token = 'YOUR_ACCESS_TOKEN';

/**
 * @param {Object} res
 * @param {string} res.url - url to open embedded application
 */
const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

getEmbeddedApplicationUrl({
  token,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
