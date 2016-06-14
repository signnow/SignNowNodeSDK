(function(){
	"use strict";
	/**
	 * OAuth2 Methods
	 */

	var querystring = require('querystring'),
			getContent = require('./common').getContent,
			common = require('./common').settings;

	//request an access token for a user
	exports.requestToken = (obj)=>{
		obj.grant_type = "password";
		var data = querystring.stringify(obj).replace("%40","@");

		common.options.method = "POST";
		common.options.path = common.basePath + "/oauth2/token";
		common.options.headers.Authorization = "Basic " + common.credentials;
		common.options.headers['Content-Type'] = "application/x-www-form-urlencoded";
		common.options.headers['Content-Length'] = data.length;

		return getContent(common.options, data).then((body)=>{
			body = JSON.parse(body);
			if(body.error){
				var err = new Error(body.error);
				console.trace(err);
				throw err;
			}
			return body;
		});
	};

	//verify an access token for a user
	exports.verify = (obj)=>{
		common.options.method = "GET";
		common.options.path = common.basePath + "/oauth2/token";
		common.options.headers.Authorization = "Bearer " + obj.token;

		return getContent(common.options).then((body)=>{
			body = JSON.parse(body);
			if(body.error){
				var err = new Error(body.error);
				console.trace(err);
				throw err;
			}
			return body;
		});
	};
})();
