/**
 * to run document-group-invite applet from the project root folder type in your console:
 * > node samples/applets/document-group-invite <client_id> <client_secret> <username> <password> <document_group_id> '<invite_config>'
 * <client_id> <client_secret> <username> <password> <document_group_id> <invite_config> - are required params
 */

'use strict';

const [
  clientId,
  clientSecret,
  username,
  password,
  documentGroupId,
  inviteConfigStringified,
] = process.argv.slice(2);

const { promisify } = require('../../utils');
const api = require('../../lib')({
  credentials: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  production: false,
});

const {
  oauth2: { requestToken: getAccessToken },
  documentGroup: { invite: createDocumentGroupInvite },
} = api;

const getAccessToken$ = promisify(getAccessToken);
const createDocumentGroupInvite$ = promisify(createDocumentGroupInvite);

getAccessToken$({
  username,
  password,
})
  .then(({ access_token: token }) => {
    const inviteConfig = JSON.parse(inviteConfigStringified);

    return {
      token,
      inviteConfig,
    };
  })
  .then(({ token, inviteConfig }) => createDocumentGroupInvite$({
    id: documentGroupId,
    data: inviteConfig,
    token,
  }))
  .then(res => console.log(res))
  .catch(err => console.error(err));
