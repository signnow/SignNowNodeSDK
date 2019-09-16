#!/usr/bin/env node

/**
 * to run remove-template applet from the project root folder type in your console:
 * > node bin/remove-template <client_id> <client_secret> <username> <password> <template_id>
 * <client_id>, <client_secret>, <username>, <password>, <template_id> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  templateId,
] = process.argv.slice(2);

const { promisify } = require('../utils');
const api = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const {
  oauth2: { requestToken: getAccessToken },
  template: { remove: removeTemplate },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const removeTemplate$ = promisify(removeTemplate);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => removeTemplate$({
    id: templateId,
    token,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
