/*
 * to run view document applet from the project root folder type in your console:
 * > node samples/applets/view-document <cliend_id> <client_secret> <username> <password> <path_to_file>
 * <cliend_id>, <client_secret>, <username>, <password>, <path_to_file> - are required params
 */

//node samples/applets/view-document 6fa29da4a3308e55c63724eaf30f1cdc ed811208b2594d9e0564df6313f423fe zolotov.artem@pdffiller.team 12345678 ./samples/files/pdf-sample.pdf

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  filepath,
] = process.argv.slice(2);

const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const { oauth2: { requestToken: getAccessToken } } = api;
const {
  document: {
    create: uploadDocument,
    view: viewDocument,
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

        viewDocument({
          id,
          token,
        }, (updateErr, updateRes) => {
          if (updateErr) {
            console.error(updateErr);
          } else {
            console.log(updateRes);
          }
        });
      }
    });
  }
});
