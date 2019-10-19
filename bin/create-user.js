#!/usr/bin/env node

/**
 * to run create-user applet from the project root folder type in your console:
 * > node bin/create-user <client_id> <client_secret> <email> <password> <first_name> <last_name> <number>
 * <client_id>, <client_secret>, <email>, <password> - are required params
 * <first_name>, <last_name>, <number> - are optional
 * options:
 * --verify-email - send verification email
 * --skip-trial - skip 30 day free trial
 */

'use strict';

const args = process.argv.slice(2);
const flags = args.filter(arg => /^--/.test(arg));
const params = args.filter(arg => !/^--/.test(arg));

const [
  clientId,
  clientSecret,
  email,
  password,
  first_name,
  last_name,
  number,
] = params;

const verifyEmail = flags.includes('--verify-email');
const skip_30day_trial = flags.includes('--skip-trial') ? 1 : 0;

const { promisify } = require('../utils');
const { user: { create: createUser } } = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const createUser$ = promisify(createUser);

createUser$({
  email,
  password,
  first_name,
  last_name,
  number,
  skip_30day_trial,
  options: { verifyEmail },
})
  .then(res => console.log(res))
  .catch(err => console.error(err));
