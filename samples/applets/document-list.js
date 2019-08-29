/**
 * to run document-list applet from the project root folder type in your console:
 * > node samples/applets/document-list <client_id> <client_secret> <username> <password>
 * <client_id>, <client_secret>, <username>, <password> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
] = process.argv.slice(2);

const { promisify } = require('../../lib/utils');
const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const {
  oauth2: { requestToken: getAccessToken },
  document: { list: getUserDocumentList },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const getUserDocumentList$ = promisify(getUserDocumentList);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => getUserDocumentList$({ token }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
