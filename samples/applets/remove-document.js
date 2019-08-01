/*
 * to run remove document applet from the project root folder type in your console:
 * > node samples/applets/download-document <cliend_id> <client_secret> <username> <password> <document_id>
 * <cliend_id>, <client_secret>, <username>, <password>, <document_id> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  documentId,
] = process.argv.slice(2);

const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const { oauth2: { requestToken: getAccessToken } } = api;
const { document: { remove: removeDocument } } = api;

getAccessToken({
  username,
  password,
}, (tokenErr, tokenRes) => {
  if (tokenErr) {
    console.error(tokenErr);
  } else {
    const { access_token: token } = tokenRes;

    removeDocument({
      id: documentId,
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
