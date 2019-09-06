/**
 * to run update-document applet from the project root folder type in your console:
 * > node samples/applets/update-document <client_id> <client_secret> <username> <password> <document_id> '<fields_stringified>'
 * <client_id>, <client_secret>, <username>, <password>, <document_id>, <fields_stringified> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  documentId,
  fieldsStringified,
] = process.argv.slice(2);

const { promisify } = require('../../utils');
const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const {
  oauth2: { requestToken: getAccessToken },
  document: { update: addFields },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const addFields$ = promisify(addFields);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => {
    const client_timestamp = Math.floor(Date.now() / 1000);
    const fields = JSON.parse(fieldsStringified);

    return {
      token,
      client_timestamp,
      fields,
    };
  })
  .then(({
    token,
    client_timestamp,
    fields,
  }) => addFields$({
    fields: {
      client_timestamp,
      fields,
    },
    id: documentId,
    token,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
