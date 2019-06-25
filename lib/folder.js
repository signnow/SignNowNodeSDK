(function(){
  'use strict';
  /**
	 * Folder Methods
	 */

  var https = require('https'),
    common = require('./common').settings;

  //list folders
  exports.list = function(obj, callback){
    common.options.method = 'GET';
    common.options.headers.Authorization = 'Bearer ' + obj.token;
    common.options.path = common.basePath + '/folder';
    delete common.options.headers['Content-Length'];

    var req = https.request(common.options, function(res) {
      var data = '';

      res.setEncoding('utf8');

      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function() {
        var parsedData = '';
        var errors = '';
                
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

    req.on('error', function(e) {
      if (callback){
        return callback(e.message);
      }
    });

    req.end();
  };

  //get documents in a folder
  exports.documents = function(obj, callback){
    common.options.method = 'GET';
    common.options.headers.Authorization = 'Bearer ' + obj.token;
    common.options.path = common.basePath + '/folder/' + obj.id;
    delete common.options.headers['Content-Length'];

    var URLParams = '';

    //build filters if supplied
    if (obj.filter && obj.filter.length > 0){
      for (var i=0; i < obj.filter.length; i++){
        if (i === 0){
          URLParams += '?filters=' + Object.keys(obj.filter[i]) + '&filter-values=' + obj.filter[i][Object.keys(obj.filter[i])];
        }else{
          URLParams += '&filters=' + Object.keys(obj.filter[i]) + '&filter-values=' + obj.filter[i][Object.keys(obj.filter[i])];
        }
      }
    }

    //build sort if supplied
    if (obj.sort){
      if (URLParams.length > 0) {
        URLParams += '&';
      } else {
        URLParams += '?';
      }
      URLParams += 'sortby=' + Object.keys(obj.sort) + '&order=' + obj.sort[Object.keys(obj.sort)];
    }

    common.options.path += URLParams;

    var req = https.request(common.options, function(res) {
      var data = '';

      res.setEncoding('utf8');

      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function() {
        var parsedData = '';
        var errors = '';
                
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

    req.on('error', function(e) {
      if (callback){
        return callback(e.message);
      }
    });

    req.end();
  };

})();
