#!/usr/bin/env node

/**
 * to run create-freeform-invite applet from the project root folder type in your console:
 * > node bin/create-freeform-invite <client_id> <client_secret> <username> <password> <document_id> <signer_email>
 * <client_id>, <client_secret>, <username>, <password>, <document_id>, <signer_email> - are required params
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
  signer,
] = params;

const dev = flags.includes('--dev');

const { promisify } = require('../utils');
const api = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: !dev,
});

const {
  oauth2: { requestToken: getAccessToken },
  document: { invite: sendFreeformInvite },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const sendFreeformInvite$ = promisify(sendFreeformInvite);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => sendFreeformInvite$({
    data: {
      from: username,
      to: signer,
    },
    id: documentId,
    token,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
