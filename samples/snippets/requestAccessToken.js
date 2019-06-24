const signnow = require('signnow')({
	credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
	production: true, // if false then uses eval server
});
const requestToken = signnow.oauth2.requestToken;

const username = 'USER_EMAIL_GOES_HERE';
const password = 'PASSWORD_GOES_HERE';

/**
 * @param {Object} res
 * @param {number} res.expires_in - time in seconds for which the token was issued
 * @param {string} res.token_type - e.g. 'bearer'
 * @param {string} res.access_token
 * @param {string} res.refresh_token
 * @param {string} res.scope
 * @param {number} res.last_login
 */
const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

requestToken({
  username,
  password,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
