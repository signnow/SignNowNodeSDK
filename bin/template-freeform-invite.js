#!/usr/bin/env node

/**
 * to run template-freeform-invite applet from the project root folder type in your console:
 * > node bin/template-freeform-invite <client_id> <client_secret> <username> <password> <template_id> <signer_email>
 * <client_id>, <client_secret>, <username> <password>, <template_id>, <signer_email> - are required params
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
  templateId,
  signerEmail,
] = params;

const dev = flags.includes('--dev');

const { promisify } = require('../utils');
const api = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: !dev,
});

const {
  oauth2: { requestToken: getAccessToken },
  template: { invite: sendFreeformInvite },
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
      to: signerEmail,
    },
    id: templateId,
    token,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
