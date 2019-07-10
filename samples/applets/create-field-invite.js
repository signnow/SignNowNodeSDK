/*
 * to run create field invite applet from the project root folder type in your console:
 * > node samples/applets/create-field-invite <client_id> <client_secret> <username> <password> <path_to_file> <fields_stringified> <invite_stringified>
 * <client_id>, <client_secret>, <username>, <password>, <path_to_file>, <fields_stringified>, <invite_stringified> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  filepath,
  fieldsStringified,
  inviteStringivied,
] = process.argv.slice(2);

const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const { oauth2: { requestToken: getAccessToken } } = api;
const {
  document: {
    create: uploadDocument,
    update: addFields,
    view: getDocumentDetails,
    invite: sendFieldInvite,
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
            getDocumentDetails({
              id,
              token,
            }, (detailsErr, detailsRes) => {
              if (detailsErr) {
                console.error(detailsErr);
              } else {
                const { roles } = detailsRes;
                let signers;

                try {
                  signers = JSON.parse(inviteStringivied);
                } catch (err) {
                  console.error(err);
                  return;
                }

                for (const signer of signers) {
                  try {
                    signer.role_id = roles.find(role => role.name === signer.role).unique_id;
                  } catch (err) {
                    console.error(err);
                    return;
                  }
                }

                sendFieldInvite({
                  data: {
                    from: username,
                    to: signers,
                  },
                  id,
                  token,
                }, (inviteErr, inviteRes) => {
                  if (inviteErr) {
                    console.error(inviteErr);
                  } else {
                    console.log(inviteRes);
                  }
                });
              }
            });
          }
        });
      }
    });
  }
});
