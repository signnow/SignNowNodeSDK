/*
 * to run create free form invite applet from the project root folder type in your console:
 * > node samples/applets/create-field-invite <client_id> <client_secret> <username> <password> <path_to_file> <signer_email>
 * <client_id>, <client_secret>, <username>, <password>, <path_to_file>, <signer_email> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  filepath,
  signer,
] = process.argv.slice(2);

const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const { oauth2: { requestToken: getAccessToken } } = api;
const {
  document: {
    create: uploadDocument,
    invite: sendFreeformInvite,
  },
} = api;

getAccessToken({
  username,
  password,
}, (tokenErr, tokenRes) => {
  if (tokenErr) {
    console.error(tokenErr);
  } else {
    const { access_token: token } = tokenRes;

    uploadDocument({
      filepath,
      token,
    }, (uploadErr, uploadRes) => {
      if (uploadErr) {
        console.error(uploadErr);
      } else {
        const { id } = uploadRes;

        sendFreeformInvite({
          data: {
            from: username,
            to: signer,
          },
          id,
          token,
        }, (inviteErr, inviteRes) => {
          if (inviteErr) {
            console.error(inviteErr);
          } else {
            console.log(inviteRes);
          }
        });
      }
    });
  }
});
