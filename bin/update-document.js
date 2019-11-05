#!/usr/bin/env node

/**
 * to run update-document applet from the project root folder type in your console:
 * > node bin/update-document <client_id> <client_secret> <username> <password> <document_id> '<fields_stringified>'
 * <client_id>, <client_secret>, <username>, <password>, <document_id>, <fields_stringified> - are required params
 * options:
 * --dev - request will be sent to developer sandbox API
 */

'use strict';

const args = process.argv.slice(2);
const flags = args.filter(arg => /^--/.test(arg));
const params = args.filter(arg => !/^--/.test(arg));

const [
  clientId,
  clientSecret,
  username,
  password,
  documentId,
  fieldsStringified,
] = params;

const dev = flags.includes('--dev');

const { promisify } = require('../utils');
const api = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: !dev,
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
