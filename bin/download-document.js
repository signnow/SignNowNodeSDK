#!/usr/bin/env node

/**
 * to run download-document applet from the project root folder type in your console:
 * > node bin/download-document <clienе_id> <client_secret> <username> <password> <document_id> <path_to_save>
 * <client_id>, <client_secret>, <username>, <password>, <document_id>, <path_to_save> - are required params
 * options flags:
 * --zip - document will be  archived in zip
 * --base64 - document will be encoded in base64
 * --with-history - document will be downloaded with its history
 * --no-history - no saving history and no tracking download
 * --skip-watermark - document watermark will be skipping
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
  pathToSaveFile,
] = params;

const zip = flags.includes('--zip');
const base64 = flags.includes('--base64');
const withHistory = flags.includes('--with-history');
const noHistory = flags.includes('--no-history');
const skipWatermark = flags.includes('--skip-watermark');

const fs = require('fs');
const { promisify } = require('../utils');
const api = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const {
  oauth2: { requestToken: getAccessToken },
  document: { download: downloadDocument },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const downloadDocument$ = promisify(downloadDocument);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => downloadDocument$({
    id: documentId,
    options: { 
      zip,
      base64,
      withHistory,
      noHistory,
      skipWatermark
     },
    token,
  }))
  .then(file => {
    const absolutePath = `${pathToSaveFile}/${documentId}.pdf`;
    fs.writeFileSync(absolutePath, file, { encoding: 'binary' });
    console.log(`Document has been downloaded. Check your '${pathToSaveFile}' directory.`);
  })
  .catch(err => console.error(err));
