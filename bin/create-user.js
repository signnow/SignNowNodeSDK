#!/usr/bin/env node

/**
 * to run create-user applet from the project root folder type in your console:
 * > node bin/create-user <client_id> <client_secret> <email> <password> <first_name> <last_name>
 * <client_id>, <client_secret>, <email>, <password> - are required params
 * <first_name>, <last_name> - are optional
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
  email,
  password,
  first_name,
  last_name,
] = params;

const dev = flags.includes('--dev');

const { promisify } = require('../utils');
const { user: { create: createUser } } = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: !dev,
});

const createUser$ = promisify(createUser);

createUser$({
  email,
  password,
  first_name,
  last_name,
})
  .then(res => console.log(res))
  .catch(err => console.error(err));
