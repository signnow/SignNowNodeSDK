/*
 * to run create signing link applet from the project root folder type in your console:
 * > node samples/applets/create-signing-link <cliend_id> <client_secret> <username> <password> <document_id>
 * <cliend_id>, <client_secret>, <username>, <password>, <document_id> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  document_id,
] = process.argv.slice(2);

const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const { oauth2: { requestToken: getAccessToken } } = api;
const { link: { create: createSigningLink } } = api;

getAccessToken({
  username,
  password,
}, (tokenErr, tokenRes) => {
  if (tokenErr) {
    console.error(tokenErr);
  } else {
    const { access_token: token } = tokenRes;

    createSigningLink({
      document_id,
      token,
    }, (createLinkErr, createLinkRes) => {
      if (createLinkErr) {
        console.error(createLinkErr);
      } else {
        console.log(createLinkRes);
      }
    });
  }
});
