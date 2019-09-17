'use strict';

const signnow = require('@signnow/api-client')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const { verifyEmail: verifyUserEmail } = signnow.user;

const email = 'USER_EMAIL_GOES_HERE';

/**
 * @param {Object} res
 * @param {string} res.status - status of verification email sending, e.g. 'success'
 */
const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

verifyUserEmail({ email },
  (err, res) => {
    if (err) {
      handleError(err);
    } else {
      handleResponse(res);
    }
  });
