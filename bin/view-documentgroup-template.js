#!/usr/bin/env node

/**
 * to run view-documentgroup-template applet from the project root folder type in your console:
 * > node bin/view-documentgroup-template <client_id> <client_secret> <username> <password> <documentgroup_template_id>
 * <client_id>, <client_secret>, <username>, <password>, <documentgroup_template_id> - are required params
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
  documentGroupTemplateId,
] = params;

const dev = flags.includes('--dev');

const { promisify } = require('../utils');
const api = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: !dev,
});

const {
  oauth2: { requestToken: getAccessToken },
  documentGroupTemplate: { view: viewDocumentGroupTemplate },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const viewDocumentGroupTemplate$ = promisify(viewDocumentGroupTemplate);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => viewDocumentGroupTemplate$({
    id: documentGroupTemplateId,
    token,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
