'use strict';

/**
 * Common request setting object
 */

const settings = {
  basePath: '',
  options: {
    host: 'api-dev1.signnow.com', // TODO: chage back to eval
    port: 443,
    headers: {
      Authorization: '',
    },
  },
};


const responseHandler = (callback, { parse = true } = {})  => res => {
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

module.exports = {
  settings,
  responseHandler,
  errorHandler,
};
