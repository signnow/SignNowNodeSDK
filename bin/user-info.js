#!/usr/bin/env node

/**
 * to run user-info applet from the project root folder type in your console:
 * > node bin/user-info <client_id> <client_secret> <email> <password>
 * <client_id>, <client_secret>, <email>, <password> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
] = process.argv.slice(2);

const { promisify } = require('../utils');
const api = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const {
  oauth2: { requestToken: getAccessToken },
  user: { retrieve: getUserInfo },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const getUserInfo$ = promisify(getUserInfo);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => getUserInfo$({ token }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
