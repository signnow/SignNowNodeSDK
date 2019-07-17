'use strict';
const https = require('https');
const {
  responseHandler, errorHandler, buildRequestOptions,
} = require('./common');


/**
 * Folder Methods
 */

// list folders
exports.list = function(obj, callback) {
  const req = https.request(buildRequestOptions({
    method: 'GET',
    path: '/folder',
    authorization: {
      type: 'Bearer',
      token: obj.token,
    },
  }), responseHandler(callback));

  req.on('error', errorHandler(callback));
  req.end();
};

// get documents in a folder
exports.documents = function(obj, callback) {
  let path = `/folder/${obj.id}`;
  let URLParams = '';

  // build filters if supplied
  if (obj.filter && obj.filter.length > 0) {
    for (let i=0; i < obj.filter.length; i++) {
      if (i === 0) {
        URLParams += `?filters=${Object.keys(obj.filter[i])}&filter-values=${obj.filter[i][Object.keys(obj.filter[i])]}`;
      } else {
        URLParams += `&filters=${Object.keys(obj.filter[i])}&filter-values=${obj.filter[i][Object.keys(obj.filter[i])]}`;
      }
    }
  }

  // build sort if supplied
  if (obj.sort) {
    if (URLParams.length > 0) {
      URLParams += '&';
    } else {
      URLParams += '?';
    }
    URLParams += `sortby=${Object.keys(obj.sort)}&order=${obj.sort[Object.keys(obj.sort)]}`;
  }

  path = path + URLParams;

  const req = https.request(buildRequestOptions({
    method: 'GET',
    authorization: {
      type: 'Bearer',
      token: obj.token,
    },
    path,
  }), responseHandler(callback));

  req.on('error', errorHandler(callback));
  req.end();
};
