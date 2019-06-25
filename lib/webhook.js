'use strict';
const https = require('https');
const common = require('./common').settings;

(function(){
  /**
	 * Webook Methods
	 */

  //list webhooks
  exports.list = function(obj, callback){
    common.options.method = 'GET';
    common.options.headers.Authorization = 'Bearer ' + obj.token;
    common.options.path = common.basePath + '/event_subscription';

    const req = https.request(common.options, res => {
      let data = '';

      res.setEncoding('utf8');

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        data = JSON.parse(data);
        const errors = JSON.parse(JSON.stringify(data)).message;
        if (callback){return callback(errors, data);}
      });
    });

    req.on('error', e => {
      if (callback){
        return callback(e.message);
      }
    });

    req.end();
  };

  //create webhook
  exports.create = function(obj, callback){
    common.options.method = 'POST';
    common.options.headers.Authorization = 'Bearer ' + obj.token;
    common.options.path = common.basePath + '/event_subscription';

    const JSONData = JSON.stringify({event: obj.event, callback_url: obj.callback_url});

    const req = https.request(common.options, res => {
      let data = '';

      res.setEncoding('utf8');

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        data = JSON.parse(data);
        const errors = JSON.parse(JSON.stringify(data)).message;
        if (callback){return callback(errors, data);}
      });
    });

    req.on('error', e => {
      if (callback){
        return callback(e.message);
      }
    });

    req.write(JSONData);
    req.end();
  };

})();
