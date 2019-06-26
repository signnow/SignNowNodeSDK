'use strict';
const https = require('https');
const { settings, responseHandler } = require('./common');


/**
 * Template Methods
 */

// create a template by flattening an existing document.
exports.create = function(obj, callback){
  settings.options.method = 'POST';
  settings.options.headers.Authorization = 'Bearer ' + obj.token;
  settings.options.path = settings.basePath + '/template';

  const JSONData = JSON.stringify({ document_id: obj.document_id, document_name: obj.document_name });

  settings.options.headers['Content-Type'] = 'application/json';
  settings.options.headers['Content-Length'] = JSONData.length;

  const req = https.request(settings.options, responseHandler(callback));

  req.on('error', e => {
    if (callback){
      return callback(e.message);
    }
  });

  req.write(JSONData);
  req.end();
};

/*
 * create a new document by copying a flattened document. If a name is not supplied
 * than it will default to the original document's name.
 */

exports.duplicate = function(obj, callback){
  settings.options.method = 'POST';
  settings.options.headers.Authorization = 'Bearer ' + obj.token;
  settings.options.path = settings.basePath + '/template/' + obj.id + '/copy';

  const JSONData = JSON.stringify({ template_id: obj.id, document_name: obj.name });

  settings.options.headers['Content-Type'] = 'application/json';
  settings.options.headers['Content-Length'] = JSONData.length;

  const req = https.request(settings.options, responseHandler(callback));

  req.on('error', e => {
    if (callback){
      return callback(e.message);
    }
  });

  req.write(JSONData);
  req.end();
};
