'use strict';
const https = require('https');
const { settings, responseHandler } = require('./common');


/**
 * Webook Methods
 */

// list webhooks
exports.list = function(obj, callback){
  settings.options.method = 'GET';
  settings.options.headers.Authorization = 'Bearer ' + obj.token;
  settings.options.path = settings.basePath + '/event_subscription';
  delete settings.options.headers['Content-Length'];

  const req = https.request(settings.options, responseHandler(callback));

  req.on('error', e => {
    if (callback){
      return callback(e.message);
    }
  });

  req.end();
};

// create webhook
exports.create = function(obj, callback){
  settings.options.method = 'POST';
  settings.options.headers.Authorization = 'Bearer ' + obj.token;
  settings.options.path = settings.basePath + '/event_subscription';

  const JSONData = JSON.stringify({event: obj.event, callback_url: obj.callback_url});

  settings.options.headers['Content-Length'] = Buffer.byteLength(JSONData);

  const req = https.request(settings.options, responseHandler(callback));

  req.on('error', e => {
    if (callback){
      return callback(e.message);
    }
  });

  req.write(JSONData);
  req.end();
};
