'use strict';

const signnow = require('@signnow/api-client')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const { signers: getDocumentSigners } = signnow.document;

const id = 'DOCUMENT_ID_GOES_HERE';
const token = 'YOUR_ACCESS_TOKEN';

/**
 * Get Document Signers optional settings
 * @type {Object}
 * @property {boolean} [allSignatures=true] - if true receive all document signers email
 * @property {boolean} [freeFormInvites=false] - if `true` return free from invite signer emails
 * @property {?string[]} [fieldInvitesStatus=null] - return signers according to specified field invite status(es)
 * Accepts list of statuses or a single status.
 * Acceptable statuses: all, pending, declined, fulfilled, created, skipped.
 * @property {?string[]} [paymentRequestsStatus=null] - return signers according to specified to payment request status(es)
 * Accepts list of statuses or a single status.
 * Available statuses: all, pending, fulfilled, created, skipped.
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

getDocumentSigners({
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
