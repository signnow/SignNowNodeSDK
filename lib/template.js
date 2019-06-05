(function(){
	"use strict";
	/**
	 * Template Methods
	 */

	var https = require('https'),
			common = require('./common').settings;

	//create a template by flattening an existing document.
	exports.create = function(obj, callback){
		common.options.method = "POST";
		common.options.headers.Authorization = "Bearer " + obj.token;
		common.options.path = common.basePath + "/template";

		var JSONData = JSON.stringify({ document_id: obj.document_id, document_name: obj.document_name });

		common.options.headers['Content-Type'] = "application/json";
        common.options.headers['Content-Length'] = JSONData.length;

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

		req.write(JSONData);
		req.end();
	};

	//create a new document by copying a flattened document. If a name is not supplied
	//than it will default to the original document's name.
	exports.duplicate = function(obj, callback){
		common.options.method = "POST";
		common.options.headers.Authorization = "Bearer " + obj.token;
		common.options.path = common.basePath + "/template/" + obj.id + "/copy";

		var JSONData = JSON.stringify({ template_id: obj.id, document_name: obj.name });

		common.options.headers['Content-Type'] = "application/json";
        common.options.headers['Content-Length'] = JSONData.length;

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

		req.write(JSONData);
		req.end();
	};
})();
