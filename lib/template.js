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

	//create a new document by copying a flattened document. If a name is not supplied
	//than it will default to the original document's name.
	exports.duplicate = function(obj, callback){
		common.options.method = "POST";
		common.options.headers.Authorization = "Bearer " + obj.token;
		common.options.path = common.basePath + "/template/" + obj.id + "/copy";

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
})();
