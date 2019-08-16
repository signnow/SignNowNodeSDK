/*
 * to run remove template applet from the project root folder type in your console:
 * > node samples/applets/remove-template <client_id> <client_secret> <username> <password> <template_id>
 * <client_id>, <client_secret>, <username>, <password>, <template_id> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  templateId,
] = process.argv.slice(2);

const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const { oauth2: { requestToken: getAccessToken } } = api;
const { template: { remove: removeTemplate } } = api;

getAccessToken({
  username,
  password,
}, (tokenErr, tokenRes) => {
  if (tokenErr) {
    console.error(tokenErr);
  } else {
    const { access_token: token } = tokenRes;

    removeTemplate({
      id: templateId,
      token,
    }, (removeErr, removeRes) => {
      if (removeErr) {
        console.error(removeErr);
      } else {
        console.log(removeRes);
      }
    });
  }
});
