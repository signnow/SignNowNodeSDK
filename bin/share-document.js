#!/usr/bin/env node

/*
 * to run share document applet from the project root folder type in your console:
 * > node bin/share-document <cliend_id> <client_secret> <username> <password> <document_id>
 * <cliend_id>, <client_secret>, <username>, <password>, <document_id> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  documentId,
] = process.argv.slice(2);

const { promisify } = require('../utils');
const api = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const {
  oauth2: { requestToken: getAccessToken },
  document: { share: shareDocument },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const shareDocument$ = promisify(shareDocument);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => shareDocument$({
    id: documentId,
    token,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
