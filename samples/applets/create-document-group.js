/*
 * to run create document group applet from the project root folder type in your console:
 * > node samples/applets/create-document-group <cliend_id> <client_secret> <username> <password> <group_name> <signature_stringified> <filepath>
 * <cliend_id>, <client_secret>, <username>, <password>, <group_name>, <signature_stringified> - are required params
 * <filepath> - is optional param. If empty, default will be './samples/files/pdf-sample.pdf'
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  group_name,
  fieldsStringifed,
  filepath = './samples/files/pdf-sample.pdf',
] = process.argv.slice(2);

const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const {
  documentGroup: { create: createDocumentGroup },
  oauth2: { requestToken: getAccessToken },
  document: {
    create: createDocument,
    update: addFields,
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

    createDocument({
      filepath,
      token
    }, (createError, createResponse) => {
      if (createError) {
        console.error(createError);
      } else {
        const { id } = createResponse;
        const client_timestamp = Math.floor(Date.now() / 1000);

        let fields;

        try {
          fields = JSON.parse(fieldsStringifed)
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
        }, (addFieldsErr, addFieldsRes) => {
          if (addFieldsErr) {
            console.error(addFieldsErr);
          } else {
             const { id: signedId } = addFieldsRes;

            createDocument({
              filepath,
              token
            }, (createError, createResponse) => {
              if (createError) {
                console.error(createError);
              } else {
                const { id } = createResponse;

                createDocumentGroup({
                  token,
                  document_ids: [signedId, id],
                  group_name
                }, (createDocGroupErr, createDocGroupRes) => {
                  if (createDocGroupErr) {
                    console.error(createDocGroupErr);
                  } else {
                    console.log(createDocGroupRes);
                  }
                })
              }
            })
          }
        })
      }
    })
  }
});
