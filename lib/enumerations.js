'use strict';
const https = require('https');
const common = require('./common').settings;

(function(){

  /**
	 * Enumeration Methods
	 */

  //add an enumeration field(drop down) to a document.
  //NOTE: must be used with POST /enumeration_options () or the API will not recognize it
  exports.addField = function(obj, callback){
    common.options.method = 'POST';
    common.options.headers.Authorization = 'Bearer ' + obj.token;
    common.options.path = common.basePath + '/enumeration_field';

    const req = https.request(common.options, res => {
      res.setEncoding('utf8');
      res.on('data', chunk => {
        let data = '';
        data += JSON.parse(chunk);
        const errors = chunk.errors;
        if (callback){return callback(errors, data);}
      });
    });

    req.on('error', e => {
      if (callback){
        return callback(e.message);
      }
    });

    req.write(JSON.stringify(obj));
    req.end();
  };

  //add enumeration options to the field that was created using the REST call above.
  //NOTE: must be used with POST /enumeration_field () or the API will not recognize the field
  exports.addOptions = function(obj, callback){
    common.options.method = 'POST';
    common.options.headers.Authorization = 'Bearer ' + obj.token;
    common.options.path = common.basePath + '/enumeration_options';

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

    req.write(JSON.stringify(obj));
    req.end();
  };
})();
