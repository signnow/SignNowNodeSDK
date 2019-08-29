/**
 * to run refresh-token applet from the project root folder type in your console:
 * > node samples/applets/refresh-token <client_id> <client_secret> <refresh_token>
 * <client_id>, <client_secret>, <refresh_token> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  refresh_token,
] = process.argv.slice(2);

const { promisify } = require('../../lib/utils');
const { oauth2: { refreshToken: refreshAccessToken } } = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const refreshAccessToken$ = promisify(refreshAccessToken);

refreshAccessToken$({ refresh_token })
  .then(res => console.log(res))
  .catch(err => console.error(err));
