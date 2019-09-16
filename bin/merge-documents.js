#!/usr/bin/env node

/**
 * to run merge-documents applet from the project root folder type in your console:
 * > node bin/merge-documents <client_id> <client_secret> <username> <password> <new_name> <remove_originals> <...document_ids>
 * <client_id>, <client_secret>, <username>, <password>, <new_name>, <remove_originals>, <...document_ids> - are required params
 * <...document_ids> - one or more document iDs
 * <remove_originals> - set 'true' or 'false'
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  name,
  removeOriginalDocuments,
  ...document_ids
] = process.argv.slice(2);

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
    options: { removeOriginalDocuments: removeOriginalDocuments === 'true' },
    token,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
