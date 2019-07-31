/*
 * to run template free form invite applet from the project root folder type in your console:
 * > node samples/applets/template-freeform-invite <client_id> <client_secret> <username> <password> <path_to_file> '<template_name>' <signer_email> <delete_original>
 * <client_id>, <client_secret>, <username> <password>, <path_to_file>, <template_name>, <signer_email> - are required params
 * <delete_original> - optional param. If ommited defaults to false
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  filepath,
  templateName,
  signerEmail,
  removeOriginalDocument,
] = process.argv.slice(2);

const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const { oauth2: { requestToken: getAccessToken } } = api;
const {
  document: { create: uploadDocument },
  template: {
    create: createTemplate,
    invite: sendInvite,
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

        createTemplate({
          document_id: id,
          document_name: templateName,
          options: { removeOriginalDocument: removeOriginalDocument === 'true' },
          token,
        }, (templateErr, templateRes) => {
          if (templateErr) {
            console.error(templateErr);
          } else {
            const { id: templateId } = templateRes;

            sendInvite({
              data: {
                from: username,
                to: signerEmail,
              },
              id: templateId,
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
