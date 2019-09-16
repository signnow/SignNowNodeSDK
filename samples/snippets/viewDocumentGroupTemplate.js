'use strict';

const signnow = require('@signnow/api-client')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const { view: viewDocumentGroupTemplate } = signnow.documentGroupTemplate;

const id = 'DOCUMENT_GROUP_TEMPLATE_ID_GOES_HERE';
const token = 'YOUR_ACCESS_TOKEN';

/**
 * Document Group Template view response
 * @typedef {Object} DocumentGroupTemplateViewResponse
 * @property {string} id - id of Document Group Template
 * @property {string} group_name - name of Document Group Template
 * @property {string} document_group_template_owner_email - Document Group Template owner email
 * @property {number} shared - is Document Group Template shared or not (values: 0 or 1)
 * @property {?string} shared_team_id - id of team which Document Group Template is shared with
 * @property {Object[]} templates - each single template details
 * @property {Object} routing_details - signing steps configuration
 * @property {Object[]} originator_organization_settings - originator organization settings
 */

/**
 * @param {DocumentGroupTemplateViewResponse} res
 */
const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

viewDocumentGroupTemplate({
  id,
  token,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
