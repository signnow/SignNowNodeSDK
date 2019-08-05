/*
 * to run retrieve-user-info applet from the project root folder type in your console:
 * > node samples/applets/retrieve-user-info <cliend_id> <client_secret> <email> <password>
 * <cliend_id>, <client_secret>, <email>, <password> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
] = process.argv.slice(2);

const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const {
  user: { retrieve: getUserInfo },
  oauth2: { requestToken: getAccessToken },
} = api;

getAccessToken({
  username,
  password,
}, (tokenErr, tokenRes) => {
  if (tokenErr) {
    console.error(tokenErr);
  } else {
    const { access_token: token } = tokenRes;

    getUserInfo({ token }, (getInfoErr, getInfoRes) => {
      if (getInfoErr) {
        console.error(getInfoErr);
      } else {
        console.log(getInfoRes);
      }
    });
  }
});
