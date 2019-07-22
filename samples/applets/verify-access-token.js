/*
 * to run verify access token applet from the project root folder type in your console:
 * > node samples/applets/verify-access-token <cliend_id> <client_secret> <username> <password>
 * <cliend_id>, <client_secret>, <username>, <password> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password
] = process.argv.slice(2);

const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const { oauth2: { requestToken: getAccessToken } } = api;
const { oauth2: { verify: verifyAccessToken } } = api;

getAccessToken({
  username,
  password,
}, (tokenErr, tokenRes) => {
  if (tokenErr) {
    console.error(tokenErr);
  } else {
    const { access_token: token } = tokenRes;

    verifyAccessToken({
      token
    }, (verifyErr, verifyRes) => {
      if (verifyErr) {
        console.error(verifyErr)
      } else {
        console.log(verifyRes)
      }
    })
  }
});
