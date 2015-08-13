(function(){
	"use strict";
	/**
	 * Folder Methods
	 */

	var https = require('https'),
			fs = require('fs'),
			common = require('./common').settings;

	//list folders
	exports.list = function(obj, callback){
		common.options.method = "GET";
		common.options.headers.Authorization = "Bearer " + obj.token;
		common.options.path = common.basePath + "/folder";

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

	//get documents in a folder
	exports.documents = function(obj, callback){
		common.options.method = "GET";
		common.options.headers.Authorization = "Bearer " + obj.token;
		common.options.path = common.basePath + "/folder/" + obj.id;

		var URLParams = "";

		//build filters if supplied
		if (obj.filter && obj.filter.length > 0){
			for (var i=0; i < obj.filter.length; i++){
				if (i === 0){
					URLParams += "?filter=" + Object.keys(obj.filter[i]) + "&filter-value=" + obj.filter[Object.keys(obj.filter[i])];
				}else{
					URLParams += "&filter=" + Object.keys(obj.filter[i]) + "&filter-value=" + obj.filter[Object.keys(obj.filter[i])];
				}
			}
		}

		//build sort if supplied
		if (obj.sort && obj.sort > 0){
			if (URLParams.length > 0){
				URLParams += "&";
			}else{
				URLParams += "?";
			}
			URLParams += "sortby=" + Object.keys(obj.sort) + "&order=" + obj.sort[Object.keys(obj.sort)];
		}

		common.options.path += URLParams;

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
