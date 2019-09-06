/**
 * to run verify-access-token applet from the project root folder type in your console:
 * > node samples/applets/verify-access-token <client_id> <client_secret> <access_token>
 * <client_id>, <client_secret>, <access_token> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  token,
] = process.argv.slice(2);

const { promisify } = require('../../utils');
const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const { oauth2: { verify: verifyAccessToken } } = api;

const verifyAccessToken$ = promisify(verifyAccessToken);

verifyAccessToken$({ token })
  .then(res => console.log(res))
  .catch(err => console.error(err));
