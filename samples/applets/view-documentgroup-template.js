/**
 * to run view-documentgroup-template applet from the project root folder type in your console:
 * > node samples/applets/view-documentgroup-template <client_id> <client_secret> <username> <password> <documentgroup_template_id>
 * <client_id>, <client_secret>, <username>, <password>, <documentgroup_template_id> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  documentGroupTemplateId,
] = process.argv.slice(2);

const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const {
  oauth2: { requestToken: getAccessToken },
  documentGroupTemplate: { view: viewDocumentGroupTemplate },
} = api;

getAccessToken({
  username,
  password,
}, (tokenErr, tokenRes) => {
  if (tokenErr) {
    console.error(tokenErr);
  } else {
    const { access_token: token } = tokenRes;

    viewDocumentGroupTemplate({
      id: documentGroupTemplateId,
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
