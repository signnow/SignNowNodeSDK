#!/usr/bin/env node

/**
 * to run embedded-cancel-invites applet from the project root folder type in your console:
 * > node bin/embedded-cancel-invites <client_id> <client_secret> <username> <password> <document_id>
 * <client_id>, <client_secret>, <username>, <password>, <document_id> - are required params
 * options:
 * --dev - request will be sent to developer sandbox API
 */

'use strict';

const args = process.argv.slice(2);
const flags = args.filter(arg => /^--/.test(arg));
const params = args.filter(arg => !/^--/.test(arg));

const [
  clientId,
  clientSecret,
  username,
  password,
  documentId,
] = params;

const dev = flags.includes('--dev');

const { promisify } = require('../utils');
const api = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: !dev,
});

const {
  oauth2: { requestToken: getAccessToken },
  embedded: { cancelInvites },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const cancelInvites$ = promisify(cancelInvites);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => cancelInvites$({
    token,
    document_id: documentId,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
