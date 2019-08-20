'use strict';

const signnow = require('@signnow/api-client')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const cancelFreeFormInvite = signnow.document.cancelFreeFormInvite;

const invite_id = 'ID_OF_INVITE';
const token = 'YOUR_ACCESS_TOKEN';

/**
 * @param {Object} res
 * @param {string} res.id - an id of invite
 */
const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

cancelFreeFormInvite({
  invite_id,
  token,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
