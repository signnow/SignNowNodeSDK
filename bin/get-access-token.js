#!/usr/bin/env node

/**
 * to run get-access-token applet from the project root folder type in your console:
 * > node bin/get-access-token <client_id> <client_secret> <username> <password>
 *  <client_id>, <client_secret>, <username>, <password> - are required params
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
] = params;

const dev = flags.includes('--dev');

const { promisify } = require('../utils');
const { oauth2: { requestToken: getAccessToken } } = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: !dev,
});

const getAccessToken$ = promisify(getAccessToken);

getAccessToken$({
  username,
  password,
})
  .then(res => console.log(res))
  .catch(err => console.error(err));
