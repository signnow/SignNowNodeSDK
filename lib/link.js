(function(){
	"use strict";
	/**
	 * Link Methods
	 */

	var https = require('https'),
			common = require('./common').settings;

	//create webhook
	exports.create = function(obj, callback){
		common.options.method = "POST";
		common.options.headers.Authorization = "Bearer " + obj.token;
		common.options.path = common.basePath + "/link";

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

})();
