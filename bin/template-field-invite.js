#!/usr/bin/env node

/**
 * to run template-field-invite applet from the project root folder type in your console:
 * > node bin/template-field-invite <client_id> <client_secret> <username> <password> <template_id> '<invite_stringified>'
 * <client_id>, <client_secret>, <username>, <password>, <template_id>, <invite_stringified> - are required params
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
  inviteStringified,
] = params;

const dev = flags.includes('--dev');

const { promisify } = require('../utils');
const api = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: !dev,
});

const {
  oauth2: { requestToken: getAccessToken },
  template: { invite: sendTemplateInvite },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const sendTemplateInvite$ = promisify(sendTemplateInvite);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => {
    const signers = JSON.parse(inviteStringified);

    return {
      token,
      signers,
    };
  })
  .then(({ token, signers }) => sendTemplateInvite$({
    data: {
      from: username,
      to: signers,
    },
    id: templateId,
    token,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
