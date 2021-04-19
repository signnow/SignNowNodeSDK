#!/usr/bin/env node

/**
 * to run embedded-generate-link applet from the project root folder type in your console:
 * > node bin/embedded-generate-link <client_id> <client_secret> <username> <password> <document_id> <field_invite_unique_id> <link_expiration> <auth_method>
 * <client_id>, <client_secret>, <username>, <password>, <document_id> <field_invite_unique_id> <link_expiration> <auth_method> - are required params
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
  fieldInviteUniqueId,
  linkExpiration,
  authMethod,
] = params;

const dev = flags.includes('--dev');

const { promisify } = require('../utils');
const api = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: !dev,
});

const {
  oauth2: { requestToken: getAccessToken },
  embedded: { generateInviteLink },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const generateInviteLink$ = promisify(generateInviteLink);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => generateInviteLink$({
    token,
    document_id: documentId,
    field_invite_unique_id: fieldInviteUniqueId,
    link_expiration: linkExpiration,
    auth_method: authMethod,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
