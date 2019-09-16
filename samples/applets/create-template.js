/**
 * to run create-template applet from the project root folder type in your console:
 * > node samples/applets/create-template <client_id> <client_secret> <username> <password> <document_id> <template_name> <delete_original>
 * <client_id> <client_secret> <username> <password> <document_id> <template_name> - are required params
 * <delete_original> - optional param. If ommited defaults to false
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  documentId,
  templateName,
  removeOriginalDocument = 'false',
] = process.argv.slice(2);

const { promisify } = require('../../utils');
const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const {
  oauth2: { requestToken: getAccessToken },
  template: { create: createTemplate },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const createTemplate$ = promisify(createTemplate);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => createTemplate$({
    document_id: documentId,
    document_name: templateName,
    options: { removeOriginalDocument: removeOriginalDocument === 'true' },
    token,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
