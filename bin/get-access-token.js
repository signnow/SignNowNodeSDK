#!/usr/bin/env node

/**
 * to run get-access-token applet from the project root folder type in your console:
 * > node bin/get-access-token <client_id> <client_secret> <username> <password>
 *  <client_id>, <client_secret>, <username>, <password> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
] = process.argv.slice(2);

const { promisify } = require('../utils');
const { oauth2: { requestToken: getAccessToken } } = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const getAccessToken$ = promisify(getAccessToken);

getAccessToken$({
  username,
  password,
})
  .then(res => console.log(res))
  .catch(err => console.error(err));
