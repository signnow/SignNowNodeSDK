'use strict';

const signnow = require('@signnow/api-client')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const getDocumentSigners = signnow.document.signers;

const id = 'DOCUMENT_ID_GOES_HERE';
const token = 'YOUR_ACCESS_TOKEN';

/**
 * @typedef {Object} Document signers options
 * @property {boolean} [allSignatures = true] - if true receive all document signers email
 * @property {boolean} [freeFormInvites = false] - if true receive free from invite signers email
 * @property {string[]} [fieldInvitesStatus = null] - receive signers depends on fields status.
 *  Accepts list of statuses or a single status.
 *  Available statuses: all, pending, declined, fulfilled, created, skipped.
 * @property {string[]} [paymentRequestsStatus = null] - receive signers depends on payment status
 *  Accepts list of statuses or a single status.
 *  Available statuses: all, pending, fulfilled, created, skipped.
 */
const options = {
  freeFormInvites: false,
  fieldInviteStatus: [
    'pending',
    'skipped',
  ],
  paymentRequestStatus: 'pending',
};

/**
 * @param {string[]} res - emails of document signers
 */
const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

documentSigners({
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
