(function(){
	"use strict";
	/**
	 * User Methods
	 */

	var https = require('https'),
			common = require('./common').settings;

	//create new user account
	exports.create = function(obj, callback){
		common.options.method = "POST";
		common.options.headers.Authorization = "Basic " + common.credentials;
		common.options.path = common.basePath + "/user";

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

	//retrieve user account details
	exports.retrieve = function(obj, callback){
		common.options.method = "GET";
		common.options.headers.Authorization = "Bearer " + obj.token;
		common.options.path = common.basePath + "/user";

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

		req.end();
	};
})();
