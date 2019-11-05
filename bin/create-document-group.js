#!/usr/bin/env node

/**
 * to run create-document-group applet from the project root folder type in your console:
 * > node bin/create-document-group <client_id> <client_secret> <username> <password> <group_name> <...document_ids>
 * <client_id>, <client_secret>, <username>, <password>, <group_name>, <...document_ids> - are required params
 * <...document_ids> - ID(s) of one or more documents
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
  group_name,
  ...ids
] = params;

const dev = flags.includes('--dev');

const { promisify } = require('../utils');
const api = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: !dev,
});

const {
  oauth2: { requestToken: getAccessToken },
  documentGroup: { create: createDocumentGroup },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const createDocumentGroup$ = promisify(createDocumentGroup);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => createDocumentGroup$({
    token,
    ids,
    group_name,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
