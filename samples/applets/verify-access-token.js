/*
 * to run verify access token applet from the project root folder type in your console:
 * > node samples/applets/verify-access-token <cliend_id> <client_secret> <access_token>
 * <cliend_id>, <client_secret>, <access_token> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  token,
] = process.argv.slice(2);

const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const { oauth2: { verify: verifyAccessToken } } = api;

verifyAccessToken({ token },
  (verifyErr, verifyRes) => {
    if (verifyErr) {
      console.error(verifyErr);
    } else {
      console.log(verifyRes);
    }
  });
