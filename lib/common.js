(function(){
	"use strict";
	/**
	 * Common
	 */

	//common settings
	let settings = {
		basePath: "",
		options: {
			host: "api-eval.cudasign.com",
			port: 443,
			headers: {
				"Authorization": ""
			}
		}
	};
	const getContent = function(options, data) {
		// return new pending promise
		return new Promise((resolve, reject) => {
			// select http or https module, depending on reqested url
			const lib = require('https');
			const request = lib.request(options, (response) => {
				// handle http errors
				// if (response.statusCode < 200 || response.statusCode > 299)
				// 	reject(new Error('Failed to load page, status code: ' + response.statusCode));
				
				// temporary data holder
				const body = [];
				// on every content chunk, push it to the data array
				response.on('data', (chunk) => body.push(chunk));
				// we are done, resolve promise with those joined chunks
				response.on('end', () => resolve(body.join('')));
			});
			// handle connection errors of the request
			request.on('error', (err) => reject(err));
			if(data) request.write(data);
			request.end();
		});
	};
	
	module.exports = {
		settings: settings,
		getContent: getContent
	};

})();
