/**
 * to run remove-document applet from the project root folder type in your console:
 * > node samples/applets/remove-document <cliend_id> <client_secret> <username> <password> <document_id> <cancel_invites>
 * <cliend_id>, <client_secret>, <username>, <password>, <document_id> - are required params
 * <cancel_invites> - optional param. If ommited defaults to 'false'
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  documentId,
  cancelInvites = 'false',
] = process.argv.slice(2);

const { promisify } = require('../../lib/utils');
const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const {
  oauth2: { requestToken: getAccessToken },
  document: { remove: removeDocument },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const removeDocument$ = promisify(removeDocument);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => removeDocument$({
    id: documentId,
    options: { cancelInvites: cancelInvites === 'true' },
    token,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
