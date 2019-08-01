/*
 * to run create signing link applet from the project root folder type in your console:
 * > node samples/applets/create-signing-link <cliend_id> <client_secret> <username> <password> <path_to_file> <fields_stringified>
 * <cliend_id>, <client_secret>, <username>, <password>, <path_to_file>, <fields_stringified> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  filepath,
  fieldsStringified
] = process.argv.slice(2);

const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const { oauth2: { requestToken: getAccessToken } } = api;
const { link: { create: createSigningLink } } = api;
const {
  document: {
    create: uploadDocument,
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
    }, (uploadErr, uploadRes) => {
      if (uploadErr) {
        console.error(uploadErr);
      } else {
        const { id } = uploadRes;
        const client_timestamp = Math.floor(Date.now() / 1000);
        let fields;

        try {
          fields = JSON.parse(fieldsStringified);
        } catch (err) {
          console.log(err);
          return;
        }

        addFields({
          id,
          fields: {
            client_timestamp,
            fields,
          },
          token
        }, updateErr => {
          if (updateErr) {
            console.log(updateErr);
          } else {
            createSigningLink({
              document_id: id,
              token,
            }, (linkErr, linkRes) => {
              if (linkErr) {
                console.log(linkErr);
              } else {
                console.log(linkRes);
              }
            })
          }
        })
      }
    });
  }
});
