'use strict';
const {
  type: OSType,
  release: OSVersion,
  platform,
  arch,
} = require('os');
const { extname } = require('path');
const { getEnvConfig } = require('../../config');
const {
  version: clientVersion,
  clientName,
} = require('../../package.json');

const acceptedDocumentExtensions = [
  'doc',
  'docx',
  'pdf',
  'odt',
  'rtf',
  'xml',
  'xls',
  'xlsx',
  'ppt',
  'pptx',
  'png',
  'jpg',
  'jpeg',
  'gif',
  'bmp',
];

const fileExtensionsToMimeTypesMap = {
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  pdf: 'application/pdf',
  odt: 'application/vnd.oasis.opendocument.text',
  rtf: 'application/rtf',
  xml: 'application/xml',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  bmp: 'image/bmp',
  csv: 'text/csv',
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
 * Composes user agent string in format:
 * <client name>/<version> (<OS type> <OS version>; <platform>; <arch>) <runtime>/<version>
 * @return {string}
 */
const getUserAgent = () => {
  const { version: runtimeVersion } = process;
  return `${clientName}/v${clientVersion} (${OSType()} ${OSVersion()}; ${platform()}; ${arch()}) node/${runtimeVersion}`;
};

/**
 * @type {string}
 */
let basicCredentials;

/**
 * @return {string}
 */
const getCredentials = () => basicCredentials;

/**
 * @return {string}
 */
const setCredentials = credentials => {
  return basicCredentials = credentials;
};

/**
 * Build Request authorization settings
 * @typedef {Object} BuildRequestAuthorization
 * @property {string} [type="Basic"]
 * @property {string} [token=basicCredentials]
 */

/**
 * Build Request Options object params
 * @typedef {Object} BuildRequestOptionsParams
 * @property {string} [method="GET"]
 * @property {string} [path="/"]
 * @property {BuildRequestAuthorization} [authorization]
 * @property {Object} [headers]
 */

/**
 * Request Options object
 * @typedef {Object} RequestOptions
 * @property {string} host
 * @property {string} port
 * @property {string} method
 * @property {string} path
 * @property {Object} headers
 */

/**
 * Builds Request Options object
 * @param {BuildRequestOptionsParams}
 * @return {RequestOptions}
 */
const buildRequestOptions = ({
  method = 'GET',
  path = '/',
  authorization: {
    type = 'Basic',
    token = getCredentials(),
  } = {},
  headers = {},
}) => {
  const { api: { host, port } } = getEnvConfig();
  const options = {
    host,
    port,
    method,
    path,
    headers,
  };
  options.headers.Authorization = `${type} ${token}`;
  options.headers['User-Agent'] = getUserAgent();
  return options;
};

/**
 * @param {Object} queryParams
 * @return {string}
 */
const stringifyQueryParams = queryParams => Object
  .entries(queryParams)
  .reduce((acc, cur) => `${acc}${cur.join('=')}&`, '')
  .slice(0, -1);

/**
 * Generate random string
 * @param {string} filePath
 * @return {string}
 */
const getRandomString = strLength => {
  let str = '';
  while (str.length < strLength && strLength > 0) {
    const r = Math.random();
    str += (r < 0.1 ? Math.floor(r * 100) : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
  }
  return str;
};

/**
 * Form boundary for multipart/form-data request
 * @return {string}
 */
const getFormDataBoundary = () => `SNFormBoundary${getRandomString(30)}`;

/**
 * Get file MIME type of file by its path
 * @param {string} fileExt
 * @return {string}
 */
const getMimeTypeByFileExtension = fileExt => fileExtensionsToMimeTypesMap[fileExt];

/**
 * Check if file is acceptable for uploading
 * @param {string} fileExtension
 * @return {boolean}
 */
const isDocumentTypeAcceptable = fileExtension => acceptedDocumentExtensions.includes(fileExtension);

/**
 * Checks if file has .csv extension
 * @param {string} filePath
 * @return {boolean}
 */
const isCSVFile = filePath => extname(filePath).substr(1).toLowerCase() === 'csv';

/**
 * Return signer emails by status
 * @param {Object[]} arr
 * @param {string} key
 * @param {string} status
 * @return {string[]}
 */
const getByStatus = (arr, key, status) => arr
  .filter(field => field.status === status)
  .map(val => val[key]);

/**
 * Returns signer emails by key and status
 * @param {Object[]} arr
 * @param {string} key
 * @param {string|string[]} status
 * @return {string[]}
 */
const getSignerEmails = (arr, key, status) => {
  if (!arr || arr.length <= 0) {
    return;
  }

  if (!status || status === 'all' || status.includes('all')) {
    return arr
      .map(val => val[key])
      .filter(val => val !== '');
  }

  if (typeof status === 'string' && status !== 'all') {
    return getByStatus(arr, key, status);
  }

  if (Array.isArray(status)) {
    const emailsByStatus = [];

    status.forEach(value => {
      const filteredEmails = getByStatus(arr, key, value);

      emailsByStatus.push(filteredEmails);
    });

    return emailsByStatus.flat();
  }

  return arr;
};

/**
 * Returns signer emails with declined to sign status
 * @param {Object[]} arr
 * @param {string[]} status
 */
const getByDeclinedStatus = (arr, status) => {
  if (status.includes('declined') || status === 'declined') {
    return arr
      .filter(invite => invite.status === 'pending' && invite.declined.length > 0)
      .map(val => val.email);
  } else {
    return [];
  }
};

module.exports = {
  responseHandler,
  errorHandler,
  buildRequestOptions,
  setCredentials,
  stringifyQueryParams,
  getMimeTypeByFileExtension,
  isDocumentTypeAcceptable,
  isCSVFile,
  getFormDataBoundary,
  getByDeclinedStatus,
  getSignerEmails,
};
