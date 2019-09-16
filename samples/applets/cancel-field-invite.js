/*
 * to run cancel-field-invite applet from the project root folder type in your console:
 * > node samples/applets/cancel-field-invite <client_id> <client_secret> <username> <password> <document_id>
 * <client_id> <client_secret> <username> <password> <document_id> - are required params
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
const { document: { cancelFieldInvite: cancelDocumentFieldInvite } } = api;

getAccessToken({
  username,
  password,
}, (tokenErr, tokenRes) => {
  if (tokenErr) {
    console.error(tokenErr);
  } else {
    const { access_token: token } = tokenRes;

    cancelDocumentFieldInvite({
      id: documentId,
      token,
    }, (cancelErr, cancelRes) => {
      if (cancelErr) {
        console.error(cancelErr);
      } else {
        console.log(cancelRes);
      }
    });
  }
});
