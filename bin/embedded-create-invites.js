#!/usr/bin/env node

/**
 * to run remove-template applet from the project root folder type in your console:
 * > node bin/remove-template <client_id> <client_secret> <username> <password> <template_id>
 * <client_id>, <client_secret>, <username>, <password>, <template_id> - are required params
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
  invitesStringified,
] = params;

const dev = flags.includes('--dev');

const { promisify } = require('../utils');
const api = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: !dev,
});

const {
  oauth2: { requestToken: getAccessToken },
  embedded: { createInvite },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const createInvite$ = promisify(createInvite);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => createInvite$({
    token,
    document_id: documentId,
    invites: JSON.parse(invitesStringified),
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
