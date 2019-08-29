/**
 * to run create-user applet from the project root folder type in your console:
 * > node samples/applets/create-user <client_id> <client_secret> <email> <password> <first_name> <last_name>
 * <client_id>, <client_secret>, <email>, <password> - are required params
 * <first_name>, <last_name> - are optional
 */

'use strict';

const [
  clientId,
  clientSecret,
  email,
  password,
  first_name,
  last_name,
] = process.argv.slice(2);

const { promisify } = require('../../lib/utils');
const { user: { create: createUser } } = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
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
