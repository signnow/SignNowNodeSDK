#!/usr/bin/env node

/**
 * to run document-group-invite applet from the project root folder type in your console:
 * > node bin/document-group-invite <client_id> <client_secret> <username> <password> <document_group_id> '<invite_config>'
 * <client_id> <client_secret> <username> <password> <document_group_id> <invite_config> - are required params
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
  documentGroupId,
  inviteConfigStringified,
] = params;

const dev = flags.includes('--dev');

const { promisify } = require('../utils');
const api = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: !dev,
});

const {
  oauth2: { requestToken: getAccessToken },
  documentGroup: { invite: createDocumentGroupInvite },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const createDocumentGroupInvite$ = promisify(createDocumentGroupInvite);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => {
    const inviteConfig = JSON.parse(inviteConfigStringified);

    return {
      token,
      inviteConfig,
    };
  })
  .then(({ token, inviteConfig }) => createDocumentGroupInvite$({
    id: documentGroupId,
    data: inviteConfig,
    token,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
