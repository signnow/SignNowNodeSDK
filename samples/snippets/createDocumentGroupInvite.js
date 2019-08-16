'use strict';

const signnow = require('@signnow/api-client')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const createDocumentGroupInvite = signnow.documentGroup.invite;

const token = 'YOUR_ACCESS_TOKEN';
const id = 'DOCUMENT_GROUP_ID';

/**
 * see API Reference for invite configuration info
 * at https://signnow.github.io/SignNowNodeSDK/class/lib/documentGroup.js~DocumentGroup.html#static-method-invite
 */
const data = {
  invite_steps: [
    {
      order: 1,
      invite_emails: [
        {
          email: 'Email of Signer 1',
          subject: 'Signer 1 Needs Your Signature',
          message: 'Signer 1 invited you to sign Document 1',
          expiration_days: 30,
          reminder: 0,
        },
      ],
      invite_actions: [
        {
          email: 'Email of Signer 1',
          role_name: 'Signer 1',
          action: 'sign',
          document_id: 'Document 1 ID',
          allow_reassign: '0',
          decline_by_signature: '0',
        },
      ],
    },
    {
      order: 2,
      invite_emails: [
        {
          email: 'Email of Signer 2',
          subject: 'Signer 2 Needs Your Signature',
          message: 'Signer 2 invited you to sign Document 2',
          expiration_days: 30,
          reminder: 0,
        },
      ],
      invite_actions: [
        {
          email: 'Email of Signer 2',
          role_name: 'Signer 2',
          action: 'sign',
          document_id: 'Document 2 ID',
          allow_reassign: '0',
          decline_by_signature: '0',
        },
      ],
    },
  ],
};

/**
 * @param {Object} res
 * @param {string} res.id - ID of created Document Group invitation
 * @param {?string} res.pending_invite_link
 */
const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

createDocumentGroupInvite({
  token,
  id,
  data,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
