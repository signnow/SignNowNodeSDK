signnow
===========
SignNow REST Service Wrapper

#### About SignNow
SignNow by Barracuda is an eSigning platform that offers a cloud version, a physical appliance and also a virtual appliance. Backed by Barracuda’s industry-leading security infrastructure, SignNow is fully compliant with eSigning laws and encrypts all data in transit. Users can share, manage and access their documents with confidence. It’s never been easier to get legally binding signatures from customers, partners, and employees - in seconds using any device.

#### API Contact Information
If you have questions about the SignNow API, please visit https://techlib.barracuda.com/SignNow/RestEndpointsAPI or email [api@signnow.com](mailto:api@signnow.com).

See additional contact information at the bottom.

Installation
==============

    $ npm install signnow


Examples
==========

To run the examples you will need an API key. You can get one here [https://signnow.com/l/api/request_information](https://signnow.com/l/api/request_information). For a full list of accepted parameters, refer to the SignNow REST Endpoints API guide: [https://techlib.barracuda.com/SignNow/RestEndpointsAPI](https://techlib.barracuda.com/SignNow/RestEndpointsAPI).

Every resouce is accessed via your signnow instance:

```javascript
var signnow = require("signnow")({
	credentials: " your signnow API key ",
	production: true //(false by defult)
});
```
Every resource returns two parameters. The first param contains any errors and the second contains the results.

# User

## Create a User
```javascript
signnow.user.create({
	"first_name": "John",
	"last_name": "Wayne",
	"email":"john@domain.com",
	"password":"yourpwd"
}, function(err, res){
	if(!err){
		console.log("RESULTS:" + res);
	}else{
		console.log("ERROR:" + err);
	}
});
```

## Retrieve User Information
```javascript
signnow.user.retrieve({token:"your auth token"}, function(err, res){
	if(!err){
		console.log("RESULTS:" + res);
	}else{
		console.log("ERROR:" + err);
	}
}
});
```
# OAuth 2.0

## Request Access Token
```javascript
signnow.oauth2.requestToken({
	"username": "account username",
	"password": "account password"
}, function(err, res){
	if(!err){
		console.log("RESULTS:" + res);
	}else{
		console.log("ERROR:" + err);
	}
});
```

## Verify an Access Token
```javascript
signnow.oauth2.verify({
	token: "your auth token"
}, function(err, res){
	if(!err){
		console.log("RESULTS:" + res);
	}else{
		console.log("ERROR:" + err);
	}
});
```

# Document

## Retrieve a List of the User’s Documents
```javascript
signnow.document.list({token:"your auth token"}, function(err, res){
	if(!err){
		console.log("RESULTS:" + res);
	}else{
		console.log("ERROR:" + err);
	}
});
```

## Retrieve a Document Resource
```javascript
signnow.document.view({
	token: "your auth token",
	id: "document id"
}, function(err, res){
	if(!err){
		console.log("RESULTS:" + res);
	}else{
		console.log("ERROR:" + err);
	}
});
```

## Download a Collapsed Document
```javascript
signnow.document.download({
	token: "your auth token",
	id: "document id"
}, function(err, res){
	if(!err){
		console.log("RESULTS:" + res);
	}else{
		console.log("ERROR:" + err);
	}
});
```

## Upload Document
```javascript
signnow.document.create({
	token: "your auth token",
	filepath: ""
}, function(err, res){
	if(!err){
		console.log("RESULTS:" + res);
	}else{
		console.log("ERROR:" + err);
	}
});
```

## Upload File & Extract Fields
```javascript
signnow.document.fieldextract({
	token: "your auth token",
	filepath: ""
}, function(err, res){
	if(!err){
		console.log("RESULTS:" + res);
	}else{
		console.log("ERROR:" + err);
	}
});
```

## Update Document (add fields)
```javascript
var fieldsObj = {
	"texts":[
		{
			"size":8,
			"x":61,
			"y":72,
			"page_number":0,
			"font":"Arial",
			"data":"sample text",
			"line_height":9.075
		}
	]
}

signnow.document.update({
	token: "your auth token",
  id: "document id",
	fields: fieldsObj
}, function(err, res){
	if(!err){
		console.log("RESULTS:" + res);
	}else{
		console.log("ERROR:" + err);
	}
});
```

## Create Invite to Sign a Document
```javascript
signnow.document.invite({
	token: "your login token",
	id: "document id",
	from: "email address",
	to: "email address"
}, function(err, res){
	if(!err){
		console.log("RESULTS:" + res);
	}else{
		console.log("ERROR:" + err);
	}
});
```

## Cancel an Invite to a Document
```javascript
signnow.document.cancelInvite({
	token: "your login token",
	id: "document id"
}, function(err, res){
	if(!err){
		console.log("RESULTS:" + res);
	}else{
		console.log("ERROR:" + err);
	}
});
```

## Create a One-time Use Download URL
```javascript
signnow.document.share({
	token: "your login token",
	id: "document id"
}, function(err, res){
	if(!err){
		console.log("RESULTS:" + res);
	}else{
		console.log("ERROR:" + err);
	}
});
```

## Merges Existing Documents
```javascript
signnow.document.merge({
	token: "your login token",
	name: "the merged doc",
  document_ids: [
    "84a18d12bf7473ea3dd0e4dd1cdcded6ba6281aa",
    "a71d963c49f33176e90c5827069c422616b1500c"
  ]
}, function(err, res){
	if(!err){
		console.log("RESULTS:" + res);
	}else{
		console.log("ERROR:" + err);
	}
});
```

## Get Document History
```javascript
signnow.document.history({
	token: "your login token",
	id: "document id"
}, function(err, res){
	if(!err){
		console.log("RESULTS:" + res);
	}else{
		console.log("ERROR:" + err);
	}
});
```

# Enumerations

## Add Enumeration Field to a Document
```javascript
signnow.enumerations.addField({
	token: "your login token",
	document_id: "document id",
	"x": 150,
  "y": 200,
  "width": 200,
  "height": 50,
  "page_number": 0,
  "role": "buyer",
  "required": true,
  "label": "Clothing Brand"
}, function(err, res){
	if(!err){
		console.log("RESULTS:" + res);
	}else{
		console.log("ERROR:" + err);
	}
});
```

## Add Enumeration Options to the Field
```javascript
signnow.enumerations.addOptions({
	token: "your login token",
  "enumeration_options": [
    {
      "enumeration_id":"8a3501896160b12d4ef7507a81b2f0998b8137b1",
      "data":"Active"
    },
    {
      "enumeration_id":"8a3501896160b12d4ef7507a81b2f0998b8137b1",
      "data":"Old Navy"
    },
    {
      "enumeration_id":"8a3501896160b12d4ef7507a81b2f0998b8137b1",
      "data":"Volcom"
    }
  ]
}, function(err, res){
	if(!err){
		console.log("RESULTS:" + res);
	}else{
		console.log("ERROR:" + err);
	}
});
```

# Template

## Create a Template
```javascript
signnow.template.create({
	token: "your login token",
	document_id: "document id",
	document_name: "my template"
}, function(err, res){
	if(!err){
		console.log("RESULTS:" + res);
	}else{
		console.log("ERROR:" + err);
	}
});
```

## Duplicate a Template
```javascript
signnow.template.duplicate({
	token: "your login token",
	id: "document id",
	name: "my template"
}, function(err, res){
	if(!err){
		console.log("RESULTS:" + res);
	}else{
		console.log("ERROR:" + err);
	}
});
```
# Unit Tests
To run the unit test you will need to install "Mocha" and "Chai". You also need to create a "test.settings.js" in the root of the SignNow module. The file will need to contain the following:
```javascript
(function(){
  "use strict";
  /**
   * Test Settings
   */

  exports.settings = {
    credentials: "[ENCODED CLIENT CREDENTIALS]",
    token: "[ACCESS TOKEN]",
    username: "[SIGNNOW USERNAME]",
    password: "[SIGNNOW PASSWORD]",
    documentid: "[EXISTING DOCUMENT ID]",
    templateid: "[EXISTING TEMPLATE ID]",
    email: "[FROM EMAIL FOR INVITE]",
    testemail: "[TO EMAIL FOR INVITE]"
  };

})();
```


# Additional Contact Information

##### SUPPORT
To contact SignNow support, please email [support@signnow.com](mailto:support@signnow.com).

##### SALES
For pricing information, please call (800) 831-2050 or email [sales@signnow.com](mailto:sales@signnow.com).
