/**
 * to run cancel-field-invite applet from the project root folder type in your console:
 * > node samples/applets/cancel-field-invite <client_id> <client_secret> <username> <password> <document_id>
 * <client_id> <client_secret> <username> <password> <document_id> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  documentId,
] = process.argv.slice(2);

const { promisify } = require('../../lib/utils');
const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const {
  oauth2: { requestToken: getAccessToken },
  document: { cancelFieldInvite: cancelDocumentFieldInvite },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const cancelDocumentFieldInvite$ = promisify(cancelDocumentFieldInvite);

getAccessToken$({
  username,
  password,
})
  .then(tokenRes => tokenRes.access_token)
  .then(token => cancelDocumentFieldInvite$({
    id: documentId,
    token,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
