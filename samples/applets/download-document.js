/**
 * to run download-document applet from the project root folder type in your console:
 * > node samples/applets/download-document <clienе_id> <client_secret> <username> <password> <document_id> <path_to_save>
 * <client_id>, <client_secret>, <username>, <password>, <document_id>, <path_to_save> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  documentId,
  pathToSaveFile,
] = process.argv.slice(2);

const fs = require('fs');
const { promisify } = require('../../lib/utils');
const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const {
  oauth2: { requestToken: getAccessToken },
  document: { download: downloadDocument },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const downloadDocument$ = promisify(downloadDocument);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => downloadDocument$({
    id: documentId,
    token,
  }))
  .then(file => {
    const absolutePath = `${pathToSaveFile}/${documentId}.pdf`;
    fs.writeFileSync(absolutePath, file, { encoding: 'binary' });
    console.log(`Document has been downloaded. Check your ${pathToSaveFile} directory`);
  })
  .catch(err => console.error(err));
