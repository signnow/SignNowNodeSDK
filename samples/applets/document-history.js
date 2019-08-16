/*
 * to run document-history applet from the project root folder type in your console:
 * > node samples/applets/document-history <client_id> <client_secret> <username> <password> <document_id>
 * <client_id>, <client_secret>, <username>, <password>, <document_id> - are required params
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
const { document: { history: getDocumentHistory } } = api;

getAccessToken({
  username,
  password,
}, (tokenErr, tokenRes) => {
  if (tokenErr) {
    console.error(tokenErr);
  } else {
    const { access_token: token } = tokenRes;

    getDocumentHistory({
      id: documentId,
      token,
    }, (historyErr, historyRes) => {
      if (historyErr) {
        console.error(historyErr);
      } else {
        console.log(historyRes);
      }
    });
  }
});
