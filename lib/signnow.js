(function(){
	"use strict";
	/**
	 * SignNow API Wrapper
	 */

	var https = require('https'),
			fs = require('fs');

	var user = require('./user'),
			document = require('./document'),
			oauth2 = require('./oauth2'),
			enumerations = require('./enumerations'),
			template = require('./template'),
			common = require('./common').settings;

	module.exports = function (settings){
		//store authorization credentials in common settings
		if (settings.credentials){
			common.credentials = settings.credentials;
		}

		//toggle production
		if (settings.production && settings.production === true){
			common.options.host = "api.signnow.com";
			common.basePath = "";
		}

		return {
			user: user,
			oauth2: oauth2,
			document: document,
			enumerations: enumerations,
			template: template
		};
	};
})();
