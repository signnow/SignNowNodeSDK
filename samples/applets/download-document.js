/*
 * to run download document applet from the project root folder type in your console:
 * > node samples/applets/download-document <cliend_id> <client_secret> <username> <password> <document_id> <path_to_save>
 * <cliend_id>, <client_secret>, <username>, <password>, <document_id>, <path_to_save> - are required params
 */

'use strict';

const fs = require('fs');

const [
  clientId,
  clientSecret,
  username,
  password,
  documentId,
  pathToSaveFile,
] = process.argv.slice(2);

const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const { oauth2: { requestToken: getAccessToken } } = api;
const { document: { download: downloadDocument } } = api;

getAccessToken({
  username,
  password,
}, (tokenErr, tokenRes) => {
  if (tokenErr) {
    console.error(tokenErr);
  } else {
    const { access_token: token } = tokenRes;
    const absolutePath = `${pathToSaveFile}${documentId}.pdf`;

    downloadDocument({
      id: documentId,
      token,
    }, (downloadErr, downloadRes) => {
      if (downloadErr) {
        console.error(downloadErr);
      } else {
        try {
          fs.writeFileSync(absolutePath, downloadRes, { encoding: 'binary' });
          console.log(`Document has been downloaded. Check your ${absolutePath} directory`);
        } catch (err) {
          console.log(err);
        }
      }
    });
  }
});
