'use strict';

const signnow = require('@signnow/api-client')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const duplicateTemplate = signnow.template.duplicate;

const template_id = 'TEMPLATE_ID';
const document_name = 'NEW_DOCUMENT_NAME';
const token = 'YOUR_ACCESS_TOKEN';

/**
 * @param {Object} res
 * @param {string} res.id - an id of created template
 * @param {string} res.name - a name of created document
 */

const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

duplicateTemplate({
  id: template_id,
  name: document_name,
  token,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
