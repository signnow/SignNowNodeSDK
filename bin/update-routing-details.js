#!/usr/bin/env node

/**
 * to run update-routing-details applet from the project root folder type in your console:
 * > node bin/update-routing-details <client_id> <client_secret> <username> <password> <template_id> '<routing_details>'
 * <client_id>, <client_secret>, <username>, <password>, <template_id>, <routing_details> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  templateId,
  routingDetailsStringified,
] = process.argv.slice(2);

const { promisify } = require('../utils');
const api = require('../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const {
  oauth2: { requestToken: getAccessToken },
  template: { updateRoutingDetails },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const updateRoutingDetails$ = promisify(updateRoutingDetails);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => {
    const routingDetails = JSON.parse(routingDetailsStringified);

    return {
      token,
      routingDetails,
    };
  })
  .then(({ token, routingDetails }) => updateRoutingDetails$({
    data: routingDetails,
    id: templateId,
    token,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
