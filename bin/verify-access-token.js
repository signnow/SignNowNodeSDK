#!/usr/bin/env node

/**
 * to run verify-access-token applet from the project root folder type in your console:
 * > node bin/verify-access-token <client_id> <client_secret> <access_token>
 * <client_id>, <client_secret>, <access_token> - are required params
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
  token,
] = params;

const dev = flags.includes('--dev');

const { promisify } = require('../utils');
const api = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: !dev,
});

const { oauth2: { verify: verifyAccessToken } } = api;

const verifyAccessToken$ = promisify(verifyAccessToken);

verifyAccessToken$({ token })
  .then(res => console.log(res))
  .catch(err => console.error(err));
