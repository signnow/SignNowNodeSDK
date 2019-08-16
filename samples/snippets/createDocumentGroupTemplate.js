'use strict';

const signnow = require('@signnow/api-client')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const createDocumentGroupTemplate = signnow.documentGroupTemplate.create;

const token = 'YOUR_ACCESS_TOKEN';
const template_group_name = 'NAME_OF_NEW_DOCUMENT_GROUP_TEMPLATE';
const template_ids = [
  'TEMPLATE_1_ID',
  'TEMPLATE_2_ID',

  // ...
];

/**
 * see API Reference for routing details configuration info
 * at https://signnow.github.io/SignNowNodeSDK/class/lib/documentGroupTemplate.js~DocumentGroupTemplate.html#static-method-create
 */
const routing_details = {
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
          hasSignActions: true,
          allow_reassign: '0',
        },
      ],
      invite_actions: [
        {
          email: 'Email of Signer 1',
          role_name: 'Signer 1',
          action: 'sign',
          document_id: 'TEMPLATE_1_ID',
          document_name: 'Document 1',
          role_viewName: 'Signer 1',
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
          hasSignActions: true,
          allow_reassign: '0',
        },
      ],
      invite_actions: [
        {
          email: 'Email of Signer 2',
          role_name: 'Signer 2',
          action: 'sign',
          document_id: 'TEMPLATE_2_ID',
          document_name: 'Document 2',
          role_viewName: 'Signer 2',
          allow_reassign: '0',
          decline_by_signature: '0',
        },
      ],
    },
  ],
  include_email_attachments: 0,
};

/**
 * @param {Object} res
 * @param {string} res.id - id of created document group template
 */
const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

createDocumentGroupTemplate({
  template_group_name,
  template_ids,
  routing_details,
  token,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
