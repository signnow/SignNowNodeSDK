#!/usr/bin/env node

/*
 * to run document-signers applet from the project root folder type in your console:
 * > node bin/document-signers <client_id> <client_secret> <username> <password> <document_id>
 * <client_id>, <client_secret>, <username>, <password>, <document_id> - are required params
 * options:
 * --freeform-invites - will return a list of all freeform invite signers
 * --field-invite-status (the same as --field-invite-status=all) - will return a list of all field invite signers
 * --field-invite-status=pending,declined,fulfilled,created,skipped - will return a list of field invite signers by invite status(es). choose one(s) that you need
 * --payment-request-status (the same as --payment-request-status=all) - will return a list of all signers that payment requests are made for
 * --payment-request-status=created,pending,skipped,fulfilled - will return a list of signers that payment requests are made for by payment request status(es). choose one(s) that you need
 */

'use strict';
const args = process.argv.slice(2);
const flags = args.filter(arg => /^--/.test(arg));
const params = args.filter(arg => !/^--/.test(arg));

const freeForm = 'freeFormInvites';
const fieldStatus = 'fieldInviteStatus';
const payment = 'paymentRequestStatus';
const allExceptFirst = arr => arr.slice(1).join('').split(',');

const options = flags
  .map(flag => flag.split('=').filter(val => val !== ''))
  .reduce((acc, arr) => {
    if (arr.includes('--freeform-invites')) {
      acc[freeForm] = acc[freeForm] || true;
    }
    if (arr.includes('--field-invite-status')) {
      acc[fieldStatus] = acc[fieldStatus] || allExceptFirst(arr);
    }
    if (arr.includes('--payment-request-status')) {
      acc[payment] = acc[payment] || allExceptFirst(arr);
    }
    return acc;
  }, {});

const [
  clientId,
  clientSecret,
  username,
  password,
  documentId,
] = params;

const { promisify } = require('../utils');
const api = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const {
  oauth2: { requestToken: getAccessToken },
  document: { signers: getDocumentSigners },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const getDocumentSigners$ = promisify(getDocumentSigners);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => getDocumentSigners$({
    id: documentId,
    token,
    options,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
