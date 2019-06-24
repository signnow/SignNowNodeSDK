const signnow = require('signnow')({
	credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
	production: true, // if false then uses eval server
});
const shareDocument = signnow.document.share;

const id = 'DOCUMENT_ID_GOES_HERE';
const token = 'YOUR_ACCESS_TOKEN';

/**
 * @param {Object} res
 * @param {string} res.link - one time download link
 */
const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

shareDocument({
  id,
  token,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
