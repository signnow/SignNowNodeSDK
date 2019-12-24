#!/usr/bin/env node

/**
 * to run create-document-group-template applet from the project root folder type in your console:
 * > node bin/create-document-group-template <client_id> <client_secret> <username> <password> <template_group_name> <...template_ids> <routing_details>
 * <client_id> <client_secret> <username> <password> <template_group_name> <...template_ids> <routing_details> - are required params
 * <...template_ids> - ID(s) of one or more templates
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
  template_group_name,
  ...templateIDsWithRoutingDetails
] = params;

const dev = flags.includes('--dev');

const { promisify } = require('../utils');
const api = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: !dev,
});

const {
  oauth2: { requestToken: getAccessToken },
  documentGroupTemplate: { create: createDocumentGroupTemplate },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const createDocumentGroupTemplate$ = promisify(createDocumentGroupTemplate);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => {
    const template_ids = templateIDsWithRoutingDetails.slice(0, -1);
    const routingDetailsStringified = templateIDsWithRoutingDetails.slice(-1);
    const routing_details = JSON.parse(routingDetailsStringified);

    return {
      token,
      template_ids,
      routing_details,
    };
  })
  .then(({
    token,
    template_ids,
    routing_details,
  }) => createDocumentGroupTemplate$({
    token,
    template_ids,
    template_group_name,
    routing_details,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
