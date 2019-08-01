/*
 * to run retrieve-user-document-list applet from the project root folder type in your console:
 * > node samples/applets/retrieve-user-document-list <cliend_id> <client_secret> <username> <password>
 * <cliend_id>, <client_secret>, <username>, <password> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password
] = process.argv.slice(2);

const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const {
  document: {
    list: getUserDocumentList
  },
  oauth2: {
    requestToken: getAccessToken
  }
} = api;

getAccessToken({
  username,
  password
}, (tokenErr, tokenRes) => {
  if (tokenErr) {
    console.error(tokenErr);
  } else {
    const { access_token: token } = tokenRes;

    getUserDocumentList({
      token
    }, (getInfoErr, getInfoRes) => {
      if (getInfoErr) {
        console.error(getInfoErr);
      } else {
        console.log(getInfoRes)
      }
    })
  }
});
