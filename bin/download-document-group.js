#!/usr/bin/env node

/**
 * to run download-document-group applet from the project root folder type in your console:
 * > node bin/download-document-group <client_id> <client_secret> <username> <password> <document_group_id> <path_to_save> <...document_order>
 * <client_id>, <client_secret>, <username>, <password>, <document_group_id>, <path_to_save> - are required params
 * <...document_order> - is optional param. It stands for one or more document IDs
 * options:
 * --type - type of download flow, can be `zip` or `merged`. Defaults to `zip` 
 * --with-history - type of history merging flow, can be `no`, `after-each-document`, or `after-merged-pdf`. Defaults to `no` 
 */

'use strict';

const args = process.argv.slice(2);
const options = args.filter(arg => /^--/.test(arg));
const params = args.filter(arg => !/^--/.test(arg));

const [
  clientId,
  clientSecret,
  username,
  password,
  documentGroupId,
  pathToSaveFile,
  ...document_order
] = params;

const { type, with_history } = options.reduce((acc, cur) => {
  const [
    key,
    value,
  ] = cur.split('=');
  acc[key.slice(2).replace(/-/g, '_')] = value;
  return acc;
}, {});

const fs = require('fs');
const { promisify } = require('../utils');
const api = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const {
  oauth2: { requestToken: getAccessToken },
  documentGroup: { download: downloadDocumentGroup },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const downloadDocumentGroup$ = promisify(downloadDocumentGroup);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => downloadDocumentGroup$({
    id: documentGroupId,
    token,
    type,
    with_history,
    document_order,
  }))
  .then(file => {
    const absolutePath = `${pathToSaveFile}/${documentGroupId}.${type === 'merged' ? 'pdf' : 'zip'}`;
    fs.writeFileSync(absolutePath, file, { encoding: 'binary' });
    console.log(`Document has been downloaded. Check your ${pathToSaveFile} directory`);
  })
  .catch(err => console.error(err));
