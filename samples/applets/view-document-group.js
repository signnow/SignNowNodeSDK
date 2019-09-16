/**
 * to run view-document-group applet from the project root folder type in your console:
 * > node samples/applets/view-document-group <client_id> <client_secret> <username> <password> <documentgroup_id>
 * <client_id>, <client_secret>, <username>, <password>, <documentgroup_id> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  documentGroupId,
] = process.argv.slice(2);

const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const {
  oauth2: { requestToken: getAccessToken },
  documentGroup: { view: viewDocumentGroup },
} = api;

getAccessToken({
  username,
  password,
}, (tokenErr, tokenRes) => {
  if (tokenErr) {
    console.error(tokenErr);
  } else {
    const { access_token: token } = tokenRes;

    viewDocumentGroup({
      id: documentGroupId,
      token,
    }, (viewErr, viewRes) => {
      if (viewErr) {
        console.error(viewErr);
      } else {
        console.log(viewRes);
      }
    });
  }
});
