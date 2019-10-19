'use strict';

const signnow = require('@signnow/api-client')({
  credentials: 'BASE64_ENCODED_CLIENT_CREDENTIALS',
  production: true, // if false then uses eval server
});
const { create: createUser } = signnow.user;

const email = 'USER_EMAIL_GOES_HERE';
const password = 'PASSWORD_GOES_HERE';
const first_name = 'USER_FIRST_NAME';
const last_name = 'LAST_FIRST_NAME';
const number = 'PHONE_NUMBER';
const skip_30day_trial = 1;
const options = { verifyEmail: true };

/**
 * @param {Object} res
 * @property {string} res.id - user unique id
 * @property {number} res.verified - user is verified or not
 * @property {string} res.email - user email
 */
const handleResponse = res => {
  console.log(res);
};

const handleError = err => {
  console.error(err);
};

createUser({
  email,
  password,
  first_name,
  last_name,
  number,
  skip_30day_trial,
  options,
}, (err, res) => {
  if (err) {
    handleError(err);
  } else {
    handleResponse(res);
  }
});
