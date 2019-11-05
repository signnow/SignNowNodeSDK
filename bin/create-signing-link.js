#!/usr/bin/env node

/**
 * to run create-signing-link applet from the project root folder type in your console:
 * > node bin/create-signing-link <client_id> <client_secret> <username> <password> <document_id>
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
  document_id,
] = params;

const dev = flags.includes('--dev');

const { promisify } = require('../utils');
const api = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: !dev,
});

const {
  oauth2: { requestToken: getAccessToken },
  link: { create: createSigningLink },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const createSigningLink$ = promisify(createSigningLink);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => createSigningLink$({
    document_id,
    token,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
