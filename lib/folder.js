'use strict';
const https = require('https');
const { settings, responseHandler } = require('./common');


/**
 * Folder Methods
 */

// list folders
exports.list = function(obj, callback){
  settings.options.method = 'GET';
  settings.options.headers.Authorization = 'Bearer ' + obj.token;
  settings.options.path = settings.basePath + '/folder';
  delete settings.options.headers['Content-Length'];

  const req = https.request(settings.options, responseHandler(callback));

  req.on('error', e => {
    if (callback){
      return callback(e.message);
    }
  });

  req.end();
};

// get documents in a folder
exports.documents = function(obj, callback){
  settings.options.method = 'GET';
  settings.options.headers.Authorization = 'Bearer ' + obj.token;
  settings.options.path = settings.basePath + '/folder/' + obj.id;
  delete settings.options.headers['Content-Length'];

  let URLParams = '';

  // build filters if supplied
  if (obj.filter && obj.filter.length > 0){
    for (let i=0; i < obj.filter.length; i++){
      if (i === 0){
        URLParams += '?filters=' + Object.keys(obj.filter[i]) + '&filter-values=' + obj.filter[i][Object.keys(obj.filter[i])];
      } else {
        URLParams += '&filters=' + Object.keys(obj.filter[i]) + '&filter-values=' + obj.filter[i][Object.keys(obj.filter[i])];
      }
    }
  }

  // build sort if supplied
  if (obj.sort){
    if (URLParams.length > 0) {
      URLParams += '&';
    } else {
      URLParams += '?';
    }
    URLParams += 'sortby=' + Object.keys(obj.sort) + '&order=' + obj.sort[Object.keys(obj.sort)];
  }

  settings.options.path += URLParams;

  const req = https.request(settings.options, responseHandler(callback));

  req.on('error', e => {
    if (callback){
      return callback(e.message);
    }
  });

  req.end();
};
