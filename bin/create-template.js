#!/usr/bin/env node

/**
 * to run create-template applet from the project root folder type in your console:
 * > node bin/create-template <client_id> <client_secret> <username> <password> <document_id> <template_name>
 * <client_id> <client_secret> <username> <password> <document_id> <template_name> - are required params
 * options:
 * --delete-original - original document will be removed after template creation
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
  templateName,
] = params;

const removeOriginalDocument = flags.includes('--delete-original');
const dev = flags.includes('--dev');

const { promisify } = require('../utils');
const api = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: !dev,
});

const {
  oauth2: { requestToken: getAccessToken },
  template: { create: createTemplate },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const createTemplate$ = promisify(createTemplate);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => createTemplate$({
    document_id: documentId,
    document_name: templateName,
    options: { removeOriginalDocument },
    token,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
