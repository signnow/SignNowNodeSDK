/*
 * to run merge-documents applet from the project root folder type in your console:
 * > node samples/applets/merge-documents <client_id> <client_secret> <username> <password> <name> <remove_originals> <...document_ids>
 * <client_id> <client_secret> <username> <password> <name> <...document_ids> - are required params
 * <...document_ids> - one or more document iDs
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  name,
  removeOriginalDocuments,
  ...document_ids
] = process.argv.slice(2);

const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const { oauth2: { requestToken: getAccessToken } } = api;
const { document: { merge: mergeDocuments } } = api;

getAccessToken({
  username,
  password,
}, (tokenErr, tokenRes) => {
  if (tokenErr) {
    console.error(tokenErr);
  } else {
    const { access_token: token } = tokenRes;

    mergeDocuments({
      name,
      document_ids,
      options: { removeOriginalDocuments: removeOriginalDocuments === 'true' },
      token,
    }, (mergeErr, mergeRes) => {
      if (mergeErr) {
        console.error(mergeErr);
      } else {
        console.log(mergeRes);
      }
    });
  }
});
