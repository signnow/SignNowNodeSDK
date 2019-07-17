/*
 * to run create user applet from the project root folder type in your console:
 * > node samples/applets/create-user <cliend_id> <client_secret> <email> <password> <first_name> <last_name>
 * <email> <password> - are required params
 * <first_name> <last_name> - are optional
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

const { user: { create: createUser } } = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

createUser({
  email,
  password,
  first_name,
  last_name,
}, (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log(res);
  }
});
