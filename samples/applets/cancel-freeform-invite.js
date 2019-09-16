/**
 * to run cancel-freeform-invite applet from the project root folder type in your console:
 * > node samples/applets/cancel-freeform-invite <client_id> <client_secret> <username> <password> <invite_id>
 * <client_id>, <client_secret>, <username>, <password>, <invite_id> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  inviteId,
] = process.argv.slice(2);

const { promisify } = require('../../utils');
const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const {
  oauth2: { requestToken: getAccessToken },
  document: { cancelFreeFormInvite: cancelDocumentFreeFormInvite },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const cancelDocumentFreeFormInvite$ = promisify(cancelDocumentFreeFormInvite);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => cancelDocumentFreeFormInvite$({
    id: inviteId,
    token,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
