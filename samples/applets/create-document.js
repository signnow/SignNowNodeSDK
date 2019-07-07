/*
 * to run create document applet from the project root folder type in your console:
 * > node samples/applets/create-document <cliend_id> <client_secret> <username> <password> <path_to_file>
 *  <cliend_id>, <client_secret>, <username>, <password>, <path_to_file> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  filepath,
] = process.argv.slice(2);

const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const { oauth2: { requestToken: getAccessToken } } = api;
const { document: { create: uploadDocument } } = api;

getAccessToken({
  username,
  password,
}, (tokenErr, tokenRes) => {
  if (tokenErr) {
    console.error(tokenErr);
  } else {
    const { access_token: token } = tokenRes;

    uploadDocument({
      filepath,
      token,
    }, (uploadErr, uploadRes) => {
      if (uploadErr) {
        console.error(uploadErr);
      } else {
        console.log(uploadRes);
      }
    });
  }
});
