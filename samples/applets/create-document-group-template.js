/**
 * to run create-document-group-template applet from the project root folder type in your console:
 * > node samples/applets/create-document-group-template <client_id> <client_secret> <username> <password> <template_group_name> <...template_ids> <routing_details>
 * <client_id> <client_secret> <username> <password> <template_group_name> <...template_ids> <routing_details> - are required params
 * <...template_ids> - ID(s) of one or more templates
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  template_group_name,
  ...templateIDsWithRoutingDetails
] = process.argv.slice(2);

const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const { oauth2: { requestToken: getAccessToken } } = api;
const { documentGroupTemplate: { create: createDocumentGroupTemplate } } = api;

getAccessToken({
  username,
  password,
}, (tokenErr, tokenRes) => {
  if (tokenErr) {
    console.error(tokenErr);
  } else {
    const { access_token: token } = tokenRes;
    const routingDetailsStringified = templateIDsWithRoutingDetails.slice(-1);
    const template_ids = templateIDsWithRoutingDetails.slice(0, -1);
    let routing_details;

    try {
      routing_details = JSON.parse(routingDetailsStringified);
    } catch (err) {
      console.error(err);
      return;
    }

    createDocumentGroupTemplate({
      token,
      template_ids,
      template_group_name,
      routing_details,
    }, (createErr, createRes) => {
      if (createErr) {
        console.error(createErr);
      } else {
        console.log(createRes);
      }
    });
  }
});
