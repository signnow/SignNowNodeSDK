const signnow = require('signnow')({
	credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
	production: true, // if false then uses eval server
});
const addSignatureField = signnow.document.update;

const id = 'DOCUMENT_ID_GOES_HERE';
const token = 'YOUR_ACCESS_TOKEN';

/**
 * @typedef {Object} SignatureField
 * @property {number} page_number - page number of document
 * @property {string} type - type of field
 * @property {string} name - unique name of the field
 * @property {string} role - role name
 * @property {boolean} required - required field
 * @property {number} height - height of the field
 * @property {number} width - width of the field
 * @property {number} x - X coordinate of the field
 * @property {number} y - Y coordinate of the field
 */

/**
 * @type {Object}
 * @property {number} client_timestamp - local time of user
 * @property {SignatureField[]} fields
 */
const fields = {
  client_timestamp: 1527859375,
  fields: [
    {
      page_number: 0,
      type: 'signature',
      name: 'FieldName',
      role: 'Signer 1',
      required: true,
      height: 40,
      width: 50,
      x: 217,
      y: 32,
    },
  ],
};

/**
 * @param {Object} res
 * @param {string} res.id - an id of document
 * @param {Object[]} res.signatures - signature and initial elements
 * @param {Object[]} res.texts - text and enumeration elements
 * @param {Object[]} res.checks - checkbox elements
 * @param {Object[]} res.attachments - attachment elements
 * @param {Object[]} res.radiobuttons - radiobutton elements
 */
const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

addSignatureField({
  id,
  fields,
  token,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
