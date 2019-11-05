#!/usr/bin/env node

/**
 * to run document-history applet from the project root folder type in your console:
 * > node bin/document-history <client_id> <client_secret> <username> <password> <document_id>
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
  document: { history: getDocumentHistory },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const getDocumentHistory$ = promisify(getDocumentHistory);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => getDocumentHistory$({
    id: documentId,
    token,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
