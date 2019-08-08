'use strict';

const signnow = require('@signnow/api-client')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const sendInviteWithPaymentRequest = signnow.document.invite;

const id = 'DOCUMENT_ID_GOES_HERE';
const token = 'YOUR_ACCESS_TOKEN';

/**
 * @typedef {Object} PaymentRequest
 * @property {string} type - type of payment request (fixed|calculated)
 * @property {number} amount
 * @property {string} currency
 * @property {string} merchant_id
 */

/**
 * @typedef {Object} SignerSettings
 * @property {string} email - signer's email
 * @property {string} role - ole name
 * @property {string} role_id - role unique idr
 * @property {number} order - role signing order
 * @property {string} reassign - allow reassign signer
 * @property {string} decline_by_signature - signer can decline invite
 * @property {number} reminder - remind via email in days
 * @property {number} expiration_days - expiration of invite in days
 * @property {?string} subject - specify subject of email
 * @property {?string} message - specify body of email
 * @property {?PaymentRequest} payment_request - payment request settings
 */

/**
 * @type {Object}
 * @property {string} document_id
 * @property {SignerSettings[]} to - array of signers
 * @property {string} from - email of sender
 * @property {?string[]} cc - array with emails
 * @property {?string} subject - specify subject of email
 * @property {?string} message - specify body of email
 * @property {?string} on_complete - on signing complete action
 */
const fieldInviteWithPaymentRequest = {
  document_id: 'DOCUMENT_ID_GOES_HERE',
  to: [
    {
      email: 'EMAIL_OF_SIGNER',
      role: 'Signer 1',
      role_id: 'ROLE_ID', // can be discovered in document details
      order: 1,
      reassign: '0',
      decline_by_signature: '0',
      reminder: 4,
      expiration_days: 27,
      subject: 'Field invite Signer1',
      message: 'Message',
      payment_request: {
        type: 'fixed',
        amount: 12,
        currency: 'US Dollar',
        merchant_id: 'MERCHANT_ID',
      },
    },
  ],
  from: 'EMAIL_OF_SENDER',
};

/**
 * @param {Object} res
 * @param {string} res.status - e.g. 'success'
 */
const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

sendInviteWithPaymentRequest({
  data: { ...fieldInviteWithPaymentRequest },
  id,
  token,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
