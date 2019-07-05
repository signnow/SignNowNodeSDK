'use strict';
const https = require('https');
const {
  responseHandler,
  errorHandler,
  buildRequestOptions,
} = require('./common');


/**
 * Folder methods
 */
class Folder {

  // list folders
  static list ({ token }, callback) {
    https
      .request(buildRequestOptions({
        method: 'GET',
        path: '/folder',
        authorization: {
          type: 'Bearer',
          token,
        },
      }), responseHandler(callback))
      .on('error', errorHandler(callback))
      .end();
  }

  // get documents in a folder
  static documents ({
    id,
    filter,
    sort,
    token,
  }, callback) {
    let path = `/folder/${id}`;
    let URLParams = '';

    // build filters if supplied
    if (Array.isArray(filter) && filter.length > 0) {
      for (let i = 0; i < filter.length; i++) {
        if (i === 0) {
          URLParams += `?filters=${Object.keys(filter[i])}&filter-values=${filter[i][Object.keys(filter[i])]}`;
        } else {
          URLParams += `&filters=${Object.keys(filter[i])}&filter-values=${filter[i][Object.keys(filter[i])]}`;
        }
      }
    }

    // build sort if supplied
    if (sort) {
      if (URLParams.length > 0) {
        URLParams += '&';
      } else {
        URLParams += '?';
      }
      URLParams += `sortby=${Object.keys(sort)}&order=${sort[Object.keys(sort)]}`;
    }

    path = path + URLParams;

    https
      .request(buildRequestOptions({
        method: 'GET',
        authorization: {
          type: 'Bearer',
          token,
        },
        path,
      }), responseHandler(callback))
      .on('error', errorHandler(callback))
      .end();
  }

}

module.exports = Folder;
