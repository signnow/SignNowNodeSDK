'use strict';
const https = require('https');
const common = require('./common').settings;

(function(){

  /**
   * Link Methods
   */

  // create webhook
  exports.create = function(obj, callback){
    common.options.method = 'POST';
    common.options.headers.Authorization = 'Bearer ' + obj.token;
    common.options.path = common.basePath + '/link';

    const JSONData = JSON.stringify({ document_id: obj.document_id });

    common.options.headers['Content-Type'] = 'application/json';
    common.options.headers['Content-Length'] = JSONData.length;

    const req = https.request(common.options, res => {
      let data = '';

      res.setEncoding('utf8');

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        let parsedData = '';
        let errors = '';
                
        try {
          parsedData = JSON.parse(data);
          errors = parsedData.errors || parsedData.message || null;
        } catch (e) {
          errors = e;
          parsedData = null;
        }
                
        if (callback) {
          return callback(errors, parsedData || data);
        }
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
