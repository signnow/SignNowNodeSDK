#!/usr/bin/env node

/**
 * to run create-document applet from the project root folder type in your console:
 * > node bin/create-document <client_id> <client_secret> <username> <password> <path_to_file>
 * <client_id>, <client_secret>, <username>, <password> - are required params
 * <path_to_file> - is optional param. If empty will be used default value './samples/files/pdf-sample.pdf'
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
  filepath = './samples/files/pdf-sample.pdf',
] = params;

const dev = flags.includes('--dev');

const { promisify } = require('../utils');
const api = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: !dev,
});

const {
  oauth2: { requestToken: getAccessToken },
  document: { create: uploadDocument },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const uploadDocument$ = promisify(uploadDocument);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => uploadDocument$({
    filepath,
    token,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
