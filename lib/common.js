'use strict';
const {
  name, version, description,
} = require('../package.json');

/**
 * Common request setting object
 */
const settings = {
  api: {
    host: 'api-eval.signnow.com',
    port: 443,
    credentials: '',
  },
};

const responseHandler = (callback, { parse = true } = {}) => res => {
  let rawData = '';

  res.setEncoding('utf8');

  res.on('data', chunk => {
    rawData += chunk;
  });

  res.on('end', () => {
    let parsedData = '';
    let errors = '';

    try {
      if (parse) {
        parsedData = JSON.parse(rawData);
        errors = parsedData.errors || parsedData.error || parsedData.message || null;
      }
    } catch (e) {
      errors = e;
      parsedData = null;
    }

    if (callback) {
      return callback(errors, parse ? parsedData : rawData);
    }
  });
};

const errorHandler = callback => err => {
  if (typeof callback === 'function') {
    return callback(err.message);
  }
};

const buildRequestOptions = ({
  method = 'GET',
  path = '/',
  authorization: {
    type = 'Basic',
    token = settings.api.credentials,
  } = {},
  headers = {},
}) => {
  const options = {
    host: settings.api.host,
    port: settings.api.port,
    method,
    path,
    headers,
  };
  options.headers.Authorization = `${type} ${token}`;
  return options;
};

const setProductionApiHost = () => {
  settings.api.host = 'api.signnow.com';
};

const setCredentials = credentials => {
  settings.api.credentials = credentials;
};

const getUserAgent = () => `${name} / v${version}, platform node.js, ${description}`;

module.exports = {
  responseHandler,
  errorHandler,
  buildRequestOptions,
  setProductionApiHost,
  setCredentials,
  getUserAgent,
};
