/*
 * to run get access token applet from the project root folder type in your console:
 * > node samples/applets/get-access-token <cliend_id> <client_secret> <email> <password>
 *  <cliend_id>, <client_secret>, <email>, <password> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
] = process.argv.slice(2);

const { oauth2: { requestToken: getAccessToken } } = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

getAccessToken({
  username,
  password,
}, (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log(res);
  }
});
