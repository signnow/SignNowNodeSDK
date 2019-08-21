/*
 * to run create document group applet from the project root folder type in your console:
 * > node samples/applets/create-document-group <cliend_id> <client_secret> <username> <password> <group_name> <...document_ids>
 * <cliend_id>, <client_secret>, <username> <password>, <group_name>, <...document_ids> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  group_name,
  ...document_ids
] = process.argv.slice(2);

const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const { oauth2: { requestToken: getAccessToken } } = api;
const { documentGroup: { create: createDocumentGroup } } = api;

getAccessToken({
  username,
  password,
}, (tokenErr, tokenRes) => {
  if (tokenErr) {
    console.error(tokenErr);
  } else {
    const { access_token: token } = tokenRes;

    createDocumentGroup({
      token,
      ids: document_ids,
      group_name,
    }, (createGroupErr, createGroupRes) => {
      if (createGroupErr) {
        console.error(createGroupErr);
      } else {
        console.log(createGroupRes);
      }
    });
  }
});
