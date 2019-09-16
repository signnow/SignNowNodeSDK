'use strict';
const {
  name,
  version,
  description,
} = require('../../package.json');

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

const responseHandler = callback => res => {
  let rawData = '';
  res
    .setEncoding('binary')
    .on('data', chunk => {
      rawData += chunk;
    })
    .on('end', () => {
      let parsedData = '';
      let errors = '';

      try {
        const utf8data = rawData.toString('utf8');
        parsedData = JSON.parse(utf8data);
        errors = parsedData.errors || parsedData.error || parsedData.message || parsedData['404'] || null;
      } catch (e) {
        parsedData = null;
      }

      if (callback) {
        callback(errors, !errors && (parsedData || rawData) || null);
        return;
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

const stringifyQueryParams = queryParams => Object
  .entries(queryParams)
  .reduce((acc, cur) => `${acc}${cur.join('=')}&`, '')
  .slice(0, -1);

module.exports = {
  responseHandler,
  errorHandler,
  buildRequestOptions,
  setProductionApiHost,
  setCredentials,
  getUserAgent,
  stringifyQueryParams,
};
