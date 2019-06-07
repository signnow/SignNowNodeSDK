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

		var JSONData = JSON.stringify({ document_id: obj.document_id });

        common.options.headers['Content-Type'] = "application/json";
        common.options.headers['Content-Length'] = JSONData.length;

		var req = https.request(common.options, function(res) {
			var data = "";

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
