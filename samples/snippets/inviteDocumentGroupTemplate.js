'use strict';

const signnow = require('@signnow/api-client')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const { invite: inviteDocumentGroupTemplate } = signnow.documentGroupTemplate;

const id = 'DOCUMENT_GROUP_TEMPLATE_ID_GOES_HERE';
const token = 'YOUR_ACCESS_TOKEN';

/**
   * Create Document Group Template invite response data
   * @typedef {Object} DocumentGroupTemplateInviteResponse
   * @property {string} id - an ID of created invite
   * @property {?string} pending_invite_link - pending invite link
   */

/**
 * @param {DocumentGroupTemplateInviteResponse} res
 */
const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

inviteDocumentGroupTemplate({
  id,
  token,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
