/**
 * to run template-field-invite applet from the project root folder type in your console:
 * > node samples/applets/template-field-invite <client_id> <client_secret> <username> <password> <template_id> '<invite_stringified>'
 * <client_id>, <client_secret>, <username>, <password>, <template_id>, <invite_stringified> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  templateId,
  inviteStringified,
] = process.argv.slice(2);

const { promisify } = require('../../lib/utils');
const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const {
  oauth2: { requestToken: getAccessToken },
  template: { invite: sendTemplateInvite },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const sendTemplateInvite$ = promisify(sendTemplateInvite);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => {
    const signers = JSON.parse(inviteStringified);

    return {
      token,
      signers,
    };
  })
  .then(({ token, signers }) => sendTemplateInvite$({
    data: {
      from: username,
      to: signers,
    },
    id: templateId,
    token,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
