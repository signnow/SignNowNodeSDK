/*
 * to run share document applet from the project root folder type in your console:
 * > node samples/applets/share-document <cliend_id> <client_secret> <username> <password> <document_id>
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
const { document: { share: shareDocument } } = api;

getAccessToken({
  username,
  password,
}, (tokenErr, tokenRes) => {
  if (tokenErr) {
    console.error(tokenErr);
  } else {
    const { access_token: token } = tokenRes;

    shareDocument({
      id: documentId,
      token,
    }, (shareErr, shareRes) => {
      if (shareErr) {
        console.error(shareErr);
      } else {
        console.log(shareRes);
      }
    });
  }
});
