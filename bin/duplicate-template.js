#!/usr/bin/env node

/**
 * to run duplicate-template applet from the project root folder type in your console:
 * > node bin/duplicate-template <client_id> <client_secret> <username> <password> <template_id> <document_name>
 * <client_id>, <client_secret>, <username>, <password>, <template_id> - are required params
 * <document_name> - optional param
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  templateId,
  documentName,
] = process.argv.slice(2);

const { promisify } = require('../utils');
const api = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const {
  oauth2: { requestToken: getAccessToken },
  template: { duplicate: createDocument },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const createDocument$ = promisify(createDocument);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => createDocument$({
    id: templateId,
    name: documentName,
    token,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
