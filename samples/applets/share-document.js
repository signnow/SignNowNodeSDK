/*
 * to run share document applet from the project root folder type in your console:
 * > node samples/applets/share-document <cliend_id> <client_secret> <username> <password> <document_id>
 * <cliend_id>, <client_secret>, <username>, <password>, <document_id> - are required params
 */

// node samples/applets/share-document 6fa29da4a3308e55c63724eaf30f1cdc ed811208b2594d9e0564df6313f423fe zolotov.artem@pdffiller.team 12345678 3eee0e56d6e62fa2b96e384a79e7ab08e4762201

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
      id: document_id,
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
