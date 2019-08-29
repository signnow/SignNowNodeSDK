/**
 * to run create-signing-link applet from the project root folder type in your console:
 * > node samples/applets/create-signing-link <client_id> <client_secret> <username> <password> <document_id>
 * <client_id>, <client_secret>, <username>, <password>, <document_id> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  document_id,
] = process.argv.slice(2);

const { promisify } = require('../../lib/utils');
const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const {
  oauth2: { requestToken: getAccessToken },
  link: { create: createSigningLink },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const createSigningLink$ = promisify(createSigningLink);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => createSigningLink$({
    document_id,
    token,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
