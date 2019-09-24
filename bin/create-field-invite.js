#!/usr/bin/env node

/**
 * to run create-field-invite applet from the project root folder type in your console:
 * > node bin/create-field-invite <client_id> <client_secret> <username> <password> <document_id> '<signers_stringified>'
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

const { promisify } = require('../utils');
const api = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const {
  oauth2: { requestToken: getAccessToken },
  document: { invite: sendFieldInvite },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const sendFieldInvite$ = promisify(sendFieldInvite);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => {
    const signers = JSON.parse(signersStringified);

    return {
      token,
      signers,
    };
  })
  .then(({ token, signers }) => sendFieldInvite$({
    data: {
      from: username,
      to: signers,
    },
    id: documentId,
    token,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
