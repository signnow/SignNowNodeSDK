#!/usr/bin/env node

/**
 * to run verify-email applet from the project root folder type in your console:
 * > node bin/verify-email <client_id> <client_secret> <email>
 * <client_id>, <client_secret>, <email> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  email,
] = process.argv.slice(2);

const { promisify } = require('../utils');
const api = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const { user: { verifyEmail } } = api;

const verifyEmail$ = promisify(verifyEmail);

verifyEmail$({ email })
  .then(res => console.log(res))
  .catch(err => console.error(err));
