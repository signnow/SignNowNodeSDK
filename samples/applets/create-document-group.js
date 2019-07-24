/*
 * to run create document group applet from the project root folder type in your console:
 * > node samples/applets/create-document-group <cliend_id> <client_secret> <username> <password> <group_name>
 * <cliend_id>, <client_secret>, <username>, <password>, <group_name> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  group_name
] = process.argv.slice(2);

const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const {
  documentGroup: {
    create: createDocumentGroup
  },
  oauth2: {
    requestToken: getAccessToken
  },
  folder: {
    documents: documentList,
    list: foldersList,
  }
} = api;

const randomId = (min, max = 10) => Math.round(Math.random() * (max - min) * min);

getAccessToken({
  username,
  password
}, (tokenErr, tokenRes) => {
  if (tokenErr) {
    console.error(tokenErr);
  } else {
    const { access_token: token } = tokenRes;

    foldersList({
      token
    }, (listErr, listRes) => {
      if (listErr) {
        console.error(listErr);
      } else {
        const id = listRes.folders[1].id;

        documentList({
          id,
          token
        }, (docListErr, docListRes) => {
            if (docListErr) {
              console.error(docListErr);
            } else {
              const documents = docListRes.documents || [];
              const validDocuments = documents.filter(doc => {
                return !doc.field_invites.length
                  && doc.roles.length
                  && doc.fields.length
              });

              const idWithInviteFields = validDocuments[randomId(1, validDocuments.length)].id;
              const documentId = documents.filter(doc => !doc.field_invites.length)[randomId(1)].id;

              createDocumentGroup({
                  token,
                  document_ids: [idWithInviteFields, documentId],
                  group_name
                }, (createDocErr, createDocRes) => {
                  if (createDocErr) {
                    console.error(createDocErr, 'createDocError');
                  } else {
                    console.log(createDocRes);
                  }
                })
            }
        });
      }
    })
  }
});
