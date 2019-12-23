'use strict';

const signnow = require('@signnow/api-client')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const { updateRoutingDetails } = signnow.template;

const id = 'TEMPLATE_ID_GOES_HERE';
const token = 'YOUR_ACCESS_TOKEN';

/**
 * Template Update Routing Details item data
 * @typedef {Object} TemplateUpdateRoutingDetailsItem
 * @property {string} default_email - default email for routing detail
 * @property {boolean} inviter_role - always `false`
 * @property {string} name - signer role (actor) name
 * @property {string} role_id - signer role (actor) unique ID
 * @property {number} signing_order - order number of signing step
 * @property {boolean} decline_by_signature - decline by signature flag
 */

/**
 * Update Template Routing Details payload
 * @type {Object}
 * @property {TemplateUpdateRoutingDetailsItem[]} template_data - array with routing details
 * @property {string[]} cc - CC emails
 * @property {Object[]} cc_step - array of CC steps
 * @property {string} [invite_link_instructions] - invite signing instructions
 */
const routingDetails = {
  template_data: [
    {
      default_email: '',
      inviter_role: false,
      name: 'Signer 1',
      role_id: 'SIGNER 1 ROLE ID',
      signing_order: 1,
      decline_by_signature: true,
    },
    {
      default_email: 'signer2@mail.com',
      inviter_role: false,
      name: 'Signer 2',
      role_id: 'SIGNER 2 ROLE ID',
      signing_order: 2,
    },
  ],
  cc: [
    'cc1@mail.com',
    'cc2@mail.com',
  ],
  cc_step: [
    {
      email: 'cc1@mail.com',
      step: 1,
      name: 'CC 1',
    },
    {
      email: 'cc2@mail.com',
      step: 2,
      name: 'CC 2',
    },
  ],
  invite_link_instructions: 'Invite link signing instruction',
};

/**
 * Update Template Routing Details response data
 * @typedef {Object} TemplateUpdateRoutingDetailsResponse
 * @property {string} id - unique ID of template routing details
 * @property {string} document_id - unique ID of Template
 * @property {Object[]} data - array with routing details
 * @property {string[]} cc - CC emails
 * @property {Object[]} cc_step - array of CC steps
 * @property {string} invite_link_instructions - invite signing instructions
 */

/**
 * @param {TemplateUpdateRoutingDetailsResponse} res
 */
const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

updateRoutingDetails({
  data: routingDetails,
  id,
  token,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
