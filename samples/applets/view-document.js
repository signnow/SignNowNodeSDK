/*
 * to run view document applet from the project root folder type in your console:
 * > node samples/applets/view-document <cliend_id> <client_secret> <username> <password> <path_to_file> <fields_stringified>
 * <cliend_id>, <client_secret>, <username>, <password> - are required params
 * <path_to_file> - is optional param. If empty, goes for './samples/files/pdf-sample.pdf'
 * '<fields_stringified>' - is optional param. If empty, will create document without fields.
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  filepath = './samples/files/pdf-sample.pdf',
  fieldsStringified
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
    update: addFields,
  }
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
    }, (viewErr, viewRes) => {
      if (viewErr) {
        console.error(viewErr);
      } else {
        const { id } = viewRes;

        if (fieldsStringified) {
          const client_timestamp = Math.floor(Date.now() / 1000);
          let fields;

          try {
            fields = JSON.parse(fieldsStringified);
          } catch (err) {
            console.error(err);
            return;
          }

          addFields({
            fields: {
              client_timestamp,
              fields,
            },
            id,
            token,
          }, updateErr => {
            if (updateErr) {
              console.error(updateErr);
            } else {
              viewDocument({
                id,
                token,
              }, (viewErr, viewRes) => {
                if (viewErr) {
                  console.error(viewErr);
                } else {
                  console.log(viewRes);
                }
              });
            }
          });
        } else {
          viewDocument({
            id,
            token,
          }, (viewErr, viewRes) => {
            if (viewErr) {
              console.error(viewErr);
            } else {
              console.log(viewRes);
            }
          });
        }
      }
    });
  }
});
