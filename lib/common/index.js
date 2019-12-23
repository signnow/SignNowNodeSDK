'use strict';
const {
  type: OSType,
  release: OSVersion,
  platform,
  arch,
} = require('os');
const {
  version: clientVersion,
  clientName,
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

/**
 * user agent string format:
 * <client name>/<version> (<OS type> <OS version>; <platform>; <arch>) <runtime>/<version>
 */
const getUserAgent = () => {
  const { version: runtimeVersion } = process;
  return `${clientName}/v${clientVersion} (${OSType()} ${OSVersion()}; ${platform()}; ${arch()}) node/${runtimeVersion}`;
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
  options.headers['User-Agent'] = getUserAgent();
  return options;
};

const setProductionApiHost = () => {
  settings.api.host = 'api.signnow.com';
};

const setCredentials = credentials => {
  settings.api.credentials = credentials;
};

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
  stringifyQueryParams,
};
