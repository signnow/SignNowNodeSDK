#!/usr/bin/env node

/**
 * to run view-document-group applet from the project root folder type in your console:
 * > node bin/view-document-group <client_id> <client_secret> <username> <password> <documentgroup_id>
 * <client_id>, <client_secret>, <username>, <password>, <documentgroup_id> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  documentGroupId,
] = process.argv.slice(2);

const { promisify } = require('../utils');
const api = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const {
  oauth2: { requestToken: getAccessToken },
  documentGroup: { view: viewDocumentGroup },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const viewDocumentGroup$ = promisify(viewDocumentGroup);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => viewDocumentGroup$({
    id: documentGroupId,
    token,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
