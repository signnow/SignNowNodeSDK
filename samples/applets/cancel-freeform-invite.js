/*
 * to run cancel free form invite applet from the project root folder type in your console:
 * > node samples/applets/cancel-freeform-invite <client_id> <client_secret> <username> <password> <invite_id>
 * <client_id>, <client_secret>, <username>, <password>, <invite_id> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  invite_id,
] = process.argv.slice(2);

const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const { oauth2: { requestToken: getAccessToken } } = api;
const { document: { cancelFreeFormInvite: cancelInvite } } = api;

getAccessToken({
  username,
  password,
}, (tokenErr, tokenRes) => {
  if (tokenErr) {
    console.error(tokenErr);
  } else {
    const { access_token: token } = tokenRes;

    cancelInvite({
      invite_id,
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
