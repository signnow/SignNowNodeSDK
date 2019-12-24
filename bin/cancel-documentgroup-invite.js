#!/usr/bin/env node

/**
 * to run cancel-documentgroup-invite applet from the project root folder type in your console:
 * > node bin/cancel-documentgroup-invite <client_id> <client_secret> <username> <password> <documentgroup_id> <invite_id>
 * <client_id>, <client_secret>, <username>, <password>, <documentgroup_id>, <invite_id> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  documentGroupId,
  inviteId,
] = process.argv.slice(2);

const { promisify } = require('../utils');
const api = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const {
  oauth2: { requestToken: getAccessToken },
  documentGroup: { cancelInvite: cancelDocumentGroupInvite },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const cancelDocumentGroupInvite$ = promisify(cancelDocumentGroupInvite);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => cancelDocumentGroupInvite$({
    id: documentGroupId,
    inviteId,
    token,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
