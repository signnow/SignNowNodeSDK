/**
 * to run extract-fields applet from the project root folder type in your console:
 * > node samples/applets/extract-fields <client_id> <client_secret> <username> <password> <path_to_file>
 * <client_id>, <client_secret>, <username>, <password> - are required params
 * <path_to_file> - optional parameter. dafault value is './samples/files/text-tags-sample.pdf'
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  filepath = './samples/files/text-tags-sample.pdf',
] = process.argv.slice(2);

const { promisify } = require('../../utils');
const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const {
  oauth2: { requestToken: getAccessToken },
  document: { fieldextract: uploadDocumentAndExtractFieldsFromTextTags },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const uploadDocumentAndExtractFieldsFromTextTags$ = promisify(uploadDocumentAndExtractFieldsFromTextTags);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => uploadDocumentAndExtractFieldsFromTextTags$({
    filepath,
    token,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
