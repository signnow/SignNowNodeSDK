'use strict';
const {
  type: OSType,
  release: OSVersion,
  platform,
  arch,
} = require('os');
const { extname } = require('path');
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
 * user agent string format:
 * <client name>/<version> (<OS type> <OS version>; <platform>; <arch>) <runtime>/<version>
 */
const getUserAgent = () => {
  const { version: runtimeVersion } = process;
  return `${clientName}/v${clientVersion} (${OSType} ${OSVersion}; ${platform}; ${arch}) node/${runtimeVersion}`;
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

// get signers email by status
const getByStatus = (arr, key, status) => {
  return arr
    .filter(field => field.status === status)
    .map(val => val[key]);
};

// get signers email by key and status
const getSignersEmail = (arr, key, status) => {
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

// get signers email with declined status
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
  setProductionApiHost,
  setCredentials,
  stringifyQueryParams,
  getMimeTypeByFileExtension,
  isDocumentTypeAcceptable,
  isCSVFile,
  getFormDataBoundary,
  getByDeclinedStatus,
  getSignersEmail,
};
