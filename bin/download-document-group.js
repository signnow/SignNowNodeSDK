#!/usr/bin/env node

/**
 * to run download-document-group applet from the project root folder type in your console:
 * > node bin/download-document-group <client_id> <client_secret> <username> <password> <document_group_id> <path_to_save> <type> <with_history> <document_order>
 * <client_id>, <client_secret>, <username>, <password>, <document_group_id>, <path_to_save> - are required params
 * <type>, <with_history>, <document_order> - are optional params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  documentGroupId,
  pathToSaveFile,
  type,
  withHistory,
  documentOrder,
] = process.argv.slice(2);

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
    with_history: withHistory,
    document_order: JSON.parse(documentOrder),
  }))
  .then(file => {
    const absolutePath = `${pathToSaveFile}/${documentGroupId}.${type === 'merged' ? 'pdf' : 'zip'}`;
    fs.writeFileSync(absolutePath, file, { encoding: 'binary' });
    console.log(`Document has been downloaded. Check your ${pathToSaveFile} directory`);
  })
  .catch(err => console.error(err));
