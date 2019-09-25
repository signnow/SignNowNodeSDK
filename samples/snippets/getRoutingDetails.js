'use strict';

const signnow = require('@signnow/api-client')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const { getRoutingDetails } = signnow.template;

const id = 'TEMPLATE_ID_GOES_HERE';
const token = 'YOUR_ACCESS_TOKEN';

/**
 * Get Template Routing Details response data
 * @typedef {Object} TemplateGetRoutingDetailsResponse
 * @property {Object[]} routing_details - array with routing details
 * @property {string[]} cc - CC emails
 * @property {Object[]} cc_step - array of CC`s steps
 * @property {string} invite_link_instructions - invite link instructions
 */

/**
 * @param {TemplateGetRoutingDetailsResponse} res
 */
const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

getRoutingDetails({
  id,
  token,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
