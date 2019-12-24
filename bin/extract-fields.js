#!/usr/bin/env node

/**
 * to run extract-fields applet from the project root folder type in your console:
 * > node bin/extract-fields <client_id> <client_secret> <username> <password> <path_to_file>
 * <client_id>, <client_secret>, <username>, <password> - are required params
 * <path_to_file> - optional parameter. default value is './samples/files/text-tags-sample.pdf'
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
  filepath = './samples/files/text-tags-sample.pdf',
] = params;

const dev = flags.includes('--dev');

const { promisify } = require('../utils');
const api = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: !dev,
});

const {
  oauth2: { requestToken: getAccessToken },
  document: { fieldextract: uploadDocumentAndExtractFieldsFromTextTags },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const uploadDocumentAndExtractFieldsFromTextTags$ = promisify(uploadDocumentAndExtractFieldsFromTextTags);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => uploadDocumentAndExtractFieldsFromTextTags$({
    filepath,
    token,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
