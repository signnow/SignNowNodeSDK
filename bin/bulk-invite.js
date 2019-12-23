#!/usr/bin/env node

/**
 * to run bulk-invite applet from the project root folder type in your console:
 * > node bin/bulk-invite <client_id> <client_secret> <username> <password> <template_id> <path_to_csv> <folder_id>
 * <client_id>, <client_secret>, <username>, <password>, <template_id>, <path_to_csv>, <folder_id> - are required params
 *
 * <path_to_csv> - path to .csv file with roles and their emails. Max file size should be <= 1 Megabyte
 * <folder_id> - an ID of folder where signed documents will be saved
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  templateId,
  csvFile,
  folderId,
] = process.argv.slice(2);

const { promisify } = require('../utils');
const api = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const {
  oauth2: { requestToken: getAccessToken },
  template: { bulkInvite: sendBulkInvite },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const sendBulkInvite$ = promisify(sendBulkInvite);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => sendBulkInvite$({
    data: {
      file: csvFile,
      folder_id: folderId,
    },
    id: templateId,
    token,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
