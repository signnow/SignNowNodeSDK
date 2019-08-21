/**
 * to run document-group-invite applet from the project root folder type in your console:
 * > node samples/applets/document-group-invite <client_id> <client_secret> <username> <password> <document_group_id> '<invite_config>'
 * <client_id> <client_secret> <username> <password> <document_group_id> <invite_config> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  id,
  inviteConfigStringified,
] = process.argv.slice(2);

const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const { oauth2: { requestToken: getAccessToken } } = api;
const { documentGroup: { invite: createDocumentGroupInvite } } = api;

getAccessToken({
  username,
  password,
}, (tokenErr, tokenRes) => {
  if (tokenErr) {
    console.error(tokenErr);
  } else {
    const { access_token: token } = tokenRes;
    let inviteConfig;

    try {
      inviteConfig = JSON.parse(inviteConfigStringified);
    } catch (err) {
      console.error(err);
      return;
    }

    createDocumentGroupInvite({
      data: inviteConfig,
      token,
      id,
    }, (createErr, createRes) => {
      if (createErr) {
        console.error(createErr);
      } else {
        console.log(createRes);
      }
    });
  }
});
