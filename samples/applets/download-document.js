/*
 * to run download document applet from the project root folder type in your console:
 * > node samples/applets/download-document <cliend_id> <client_secret> <username> <password> <path_to_save>
 * <cliend_id>, <client_secret>, <username>, <password> <path_to_save> - are required params
 */

//node samples/applets/download-document 6fa29da4a3308e55c63724eaf30f1cdc ed811208b2594d9e0564df6313f423fe zolotov.artem@pdffiller.team 12345678 ./files/

'use strict';

const fs = require('fs');

const [
  clientId,
  clientSecret,
  username,
  password,
  pathToSaveFile
] = process.argv.slice(2);

const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const { oauth2: { requestToken: getAccessToken } } = api;
const {
  document: {
    list: documentList,
    download: documentDownload,
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

    documentList({
      token
    }, (listErr, listRes) => {
      if (listErr) {
        console.log(listErr)
      } else {
        const docListIds = Array.isArray(listRes) && listRes.map(doc => doc.id);
        const finalPath = pathToSaveFile + docListIds[0] + '.pdf';

        documentDownload({
          id: docListIds[0],
          token,
        }, (downloadError, downloadResponse) => {
          if (downloadError) {
            console.log(downloadError)
          } else {
            try {
              fs.writeFileSync(finalPath, downloadResponse, { encoding: 'binary' });
              console.log('Document is downloaded.')
            } catch (err) {
              console.log(err);
              console.log('Error loading file');
            }
          }
        });
      }
    })
  }
});
