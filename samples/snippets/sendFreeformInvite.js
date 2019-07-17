'use strict';

const signnow = require('@signnow/api-client')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const sendFreeformInvite = signnow.document.invite;

const from = 'EMAIL_OF_SENDER_GOES_HERE';
const to = 'EMAIL_OF_RECIPIENT_GOES_HERE';
const id = 'DOCUMENT_ID_GOES_HERE';
const token = 'YOUR_ACCESS_TOKEN';

/**
 * @param {Object} res
 * @param {string} res.result - e.g. 'success'
 * @param {string} res.id - invite unique id
 * @param {string} res.callback_url - url for front end redirect or 'none'
 */
const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

sendFreeformInvite({
  data: {
    from,
    to,
  },
  id,
  token,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
