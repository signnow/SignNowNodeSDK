#!/usr/bin/env node

/**
 * to run merge-documents applet from the project root folder type in your console:
 * > node bin/merge-documents <client_id> <client_secret> <username> <password> <new_name> <...document_ids>
 * <client_id>, <client_secret>, <username>, <password>, <new_name>, <...document_ids> - are required params
 * <...document_ids> - one or more document iDs
 * options:
 * --remove-originals - original documents will be removed after merging
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
  name,
  ...document_ids
] = params;

const removeOriginalDocuments = flags.includes('--remove-originals');

const { promisify } = require('../utils');
const api = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const {
  oauth2: { requestToken: getAccessToken },
  document: { merge: mergeDocuments },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const mergeDocuments$ = promisify(mergeDocuments);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => mergeDocuments$({
    name,
    document_ids,
    options: { removeOriginalDocuments },
    token,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
