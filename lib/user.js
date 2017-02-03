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
		common.options.headers['content-type'] = 'application/json';
		common.options.path = common.basePath + "/user";

		var req = https.request(common.options, function(res) {
			var data = "";

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

	//retrieve user account details
	exports.retrieve = function(obj, callback){
		common.options.method = "GET";
		common.options.headers.Authorization = "Bearer " + obj.token;
		common.options.path = common.basePath + "/user";

		var req = https.request(common.options, function(res) {
			var data = "";

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

		req.end();
	};
})();
