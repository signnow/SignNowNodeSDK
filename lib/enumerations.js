(function(){
  'use strict';
  /**
	 * Enumeration Methods
	 */

  var https = require('https'),
    common = require('./common').settings;

  //add an enumeration field(drop down) to a document.
  //NOTE: must be used with POST /enumeration_options () or the API will not recognize it
  exports.addField = function(obj, callback){
    common.options.method = 'POST';
    common.options.headers.Authorization = 'Bearer ' + obj.token;
    common.options.path = common.basePath + '/enumeration_field';

    var req = https.request(common.options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        chunk = JSON.parse(chunk);
        var errors = chunk.errors;
        if (callback){return callback(errors, chunk);}
      });
    });

    req.on('error', function(e) {
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

    var req = https.request(common.options, function(res) {
      var data = '';

      res.setEncoding('utf8');

      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function(){
        data = JSON.parse(data);
        var errors = JSON.parse(JSON.stringify(data)).message;
        if (callback){return callback(errors, data);}
      });
    });

    req.on('error', function(e) {
      if (callback){
        return callback(e.message);
      }
    });

    req.write(JSON.stringify(obj));
    req.end();
  };
})();
