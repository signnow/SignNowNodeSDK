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
  let data = '';

  res.setEncoding('utf8');

  res.on('data', chunk => {
    data += chunk;
  });

  res.on('end', () => {
    let parsedData = '';
    let errors = '';
            
    try {
      if (parse) {
        parsedData = JSON.parse(data);
        errors = parsedData.errors || parsedData.message || null;
      }
    } catch (e) {
      errors = e;
      parsedData = null;
    }
            
    if (callback) {
      return callback(errors, parsedData || data);
    }
  });
};

module.exports = {
  settings,
  responseHandler,
};
