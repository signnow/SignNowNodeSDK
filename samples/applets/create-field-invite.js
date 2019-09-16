/**
 * to run create-field-invite applet from the project root folder type in your console:
 * > node samples/applets/create-field-invite <client_id> <client_secret> <username> <password> <document_id> '<signers_stringified>'
 * <client_id>, <client_secret>, <username>, <password>, <document_id>, <signers_stringified> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  documentId,
  signersStringified,
] = process.argv.slice(2);

const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const {
  oauth2: { requestToken: getAccessToken },
  document: { invite: sendFieldInvite },
} = api;

getAccessToken({
  username,
  password,
}, (tokenErr, tokenRes) => {
  if (tokenErr) {
    console.error(tokenErr);
  } else {
    const { access_token: token } = tokenRes;
    let signers;

    try {
      signers = JSON.parse(signersStringified);
    } catch (err) {
      console.error(err);
      return;
    }

    sendFieldInvite({
      data: {
        from: username,
        to: signers,
      },
      id: documentId,
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
