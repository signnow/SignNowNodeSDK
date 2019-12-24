#!/usr/bin/env node

/**
 * to run document-list applet from the project root folder type in your console:
 * > node bin/document-list <client_id> <client_secret> <username> <password>
 * <client_id>, <client_secret>, <username>, <password> - are required params
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
] = params;

const dev = flags.includes('--dev');

const { promisify } = require('../utils');
const api = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: !dev,
});

const {
  oauth2: { requestToken: getAccessToken },
  document: { list: getUserDocumentList },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const getUserDocumentList$ = promisify(getUserDocumentList);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => getUserDocumentList$({ token }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
