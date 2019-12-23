'use strict';

const signnow = require('@signnow/api-client')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const { bulkInvite: sendTemplateBulkInvite } = signnow.template;

const id = 'TEMPLATE_ID_GOES_HERE';
const token = 'YOUR_ACCESS_TOKEN';
const file = 'PATH_TO_CSV_FILE';
const folderId = 'ID_IF_FOLDER_FOR_SIGNED_DOCUMENTS';

/**
 * Send Template Bulk Invite response data
 * @typedef {Object} TemplateBulkInviteResponse
 * @property {string} status - status of sending bulk invites (e.g. "job queued")
 */

/**
 * @param {TemplateBulkInviteResponse} res
 */
const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

sendTemplateBulkInvite({
  data: {
    folder_id: folderId,
    file,
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
