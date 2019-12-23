'use strict';

const signnow = require('@signnow/api-client')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const { duplicate: createDocumentFromTemplate } = signnow.template;

const templateId = 'TEMPLATE_ID';
const documentName = 'NEW_DOCUMENT_NAME';
const token = 'YOUR_ACCESS_TOKEN';

/**
 * @param {Object} res
 * @param {string} res.id - an id of created Document
 * @param {string} res.name - a name of created Document
 */

const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

createDocumentFromTemplate({
  id: templateId,
  name: documentName,
  token,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
